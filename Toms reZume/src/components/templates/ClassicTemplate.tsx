import React from 'react';
import GithubContribution from '@/components/shared/GithubContribution';
import BaseInfo from '../preview/BaseInfo';
import ExperienceSection from '../preview/ExperienceSection';
import EducationSection from '../preview/EducationSection';
import AlbumInfoSection from '../preview/AlbumInfoPanel';
import CustomSection from '../preview/CustomSection';
import { ResumeData } from '@/types/resume';
import { ResumeTemplate } from '@/types/template';
import ProjectSection from '../preview/ProjectSection';
import { title } from 'process';

interface ClassicTemplateProps {
  data: ResumeData;
  template: ResumeTemplate;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({
  data,
  template,
}) => {
  const { colorScheme } = template;
  const enabledSections = data.menuSections.filter(
    (section) => section.enabled
  );
  const sortedSections = [...enabledSections].sort((a, b) => a.order - b.order);

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'basic':
        return (
          <>
            <BaseInfo basic={data.basic} globalSettings={data.globalSettings} />
          </>
        );
      case 'experience':
        return (
          <ExperienceSection
            experiences={data.experience}
            globalSettings={data.globalSettings}
          />
        );
      case 'education':
        return (
          <EducationSection
            education={data.education}
            globalSettings={data.globalSettings}
          />
        );
      case 'albumInfo':
        return (
          <AlbumInfoSection
            albumInfo={data.albumInfoContent}
            globalSettings={data.globalSettings}
          />
        );
      case 'projects':
        return (
          <ProjectSection
            projects={data.projects}
            globalSettings={data.globalSettings}
          />
        );
      case 'officalReview':
        if (sectionId in data.customData) {
          const sectionTitle =
            data.menuSections.find((s) => s.id === sectionId)?.title ||
            sectionId;
          return (
            <CustomSection
              title={sectionTitle}
              key={sectionId}
              sectionId={sectionId}
              items={data.customData[sectionId]}
              globalSettings={data.globalSettings}
            />
          );
        }
      case 'personalReview':
        if (sectionId in data.customData) {
          const sectionTitle =
            data.menuSections.find((s) => s.id === sectionId)?.title ||
            sectionId;
          return (
            <CustomSection
              title={sectionTitle}
              key={sectionId}
              sectionId={sectionId}
              items={data.customData[sectionId]}
              globalSettings={data.globalSettings}
            />
          );
        }
      default:
        if (sectionId in data.customData) {
          const sectionTitle =
            data.menuSections.find((s) => s.id === sectionId)?.title ||
            sectionId;
          return (
            <CustomSection
              title={sectionTitle}
              key={sectionId}
              sectionId={sectionId}
              items={data.customData[sectionId]}
              globalSettings={data.globalSettings}
            />
          );
        }
        return null;
    }
  };

  return (
    <div
      className="flex flex-col w-full min-h-screen"
      style={{
        backgroundColor: colorScheme.background,
        color: colorScheme.text,
      }}
    >
      {sortedSections.map((section) => (
        <div key={section.id}>{renderSection(section.id)}</div>
      ))}
    </div>
  );
};

export default ClassicTemplate;
