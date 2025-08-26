'use client';
import { useTranslations } from 'next-intl';
import React, { createContext } from 'react';
import { cn } from '@/lib/utils';
import AnimatedFeature from './client/AnimatedFeature';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectFade,
  EffectCoverflow,
} from 'swiper/modules';
import 'swiper/css/effect-coverflow';
import Image from 'next/image';
import ScrollBackground from './client/ScrollBackground';
import { albumData } from '@/config/initialResumeData';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { AnimatePresence, motion } from 'framer-motion';

export default function IntroductionSection() {
  const t = useTranslations('home.introduction');
  return (
    <section className="relative pt-40 pb-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <ScrollBackground />
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedFeature>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">
              {t('title')}
            </h2>
          </AnimatedFeature>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {t('description')}
          </p>
          <Swiper
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={40}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 200,
              modifier: 2.5,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 3000 }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className={cn('mySwiper', 'max-w-3xl h-[40vh] overflow-visible')}
          >
            {albumData.map((album, index) => (
              <SwiperSlide
                key={'album' + album.id}
                className="flex justify-center items-center"
              >
                <div className="relative w-[28vh] h-[28vh]">
                  <Image
                    src={album.img}
                    alt={`Album ${album.id}`}
                    fill
                    className="object-cover rounded-lg shadow-lg"
                    priority={index === 0} // 第一张图片优先加载
                    loading={index === 0 ? undefined : 'lazy'} // 第一张图片不延迟加载
                    sizes="(max-width: 768px) 28vh, 28vh"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2 mt-8">
            Examples...
          </p>
          <Tabs defaultValue="tab1" className="w-full mt-2">
            <TabsList>
              <TabsTrigger value="tab1">Brat</TabsTrigger>
              <TabsTrigger value="tab2">永恒阳光</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key="brat"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="relative w-[60vh] h-[80vh]"
                >
                  <Image
                    src="/reviews/bratReview.jpg"
                    alt="Brat"
                    className="object-cover rounded-lg shadow-lg"
                    loading="lazy"
                    fill
                    sizes="(max-width: 768px) 40vh, 60vh"
                  />
                </motion.div>
              </AnimatePresence>
            </TabsContent>
            <TabsContent value="tab2" className="flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key="es"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="relative w-[60vh] h-[80vh]"
                >
                  <Image
                    src="/reviews/esReview.jpg"
                    alt="永恒阳光"
                    className="object-cover rounded-lg shadow-lg"
                    loading="lazy"
                    fill
                    sizes="(max-width: 768px) 40vh, 60vh"
                  />
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
