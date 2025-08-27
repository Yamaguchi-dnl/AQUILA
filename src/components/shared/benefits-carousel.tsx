
"use client";

import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

SwiperCore.use([Navigation]);

type BenefitItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type BenefitsCarouselProps = {
  items: BenefitItem[];
};

export function BenefitsCarousel({ items }: BenefitsCarouselProps) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      <style jsx global>{`
        .benefits-swiper .swiper-wrapper {
          align-items: center;
          padding: 2rem 0;
        }

        .benefits-swiper .swiper-slide {
          transform: scale(0.8);
          transition: transform 300ms ease-in-out;
          opacity: 0.5;
        }

        .benefits-swiper .swiper-slide-active {
          transform: scale(1);
          opacity: 1;
          z-index: 10;
        }
        
        .benefits-swiper .swiper-slide-next,
        .benefits-swiper .swiper-slide-prev {
           transform: scale(0.9);
           opacity: 0.7;
        }
        
        .swiper-button {
          --position: 1rem;
          background-color: hsl(var(--highlight));
          height: 3rem;
          width: 3rem;
          border-radius: 9999px;
          color: white;
          transition: background-color 0.2s;
        }

        .swiper-button:hover {
          background-color: hsl(var(--primary));
        }

        .swiper-button::after {
          font-size: 1.25rem;
          font-weight: bold;
        }
        
        .swiper-button-prev {
            left: var(--position);
        }
        .swiper-button-next {
            right: var(--position);
        }
        
        @media (max-width: 768px) {
            .swiper-button {
                display: none;
            }
        }
      `}</style>
      <div className="relative">
        <Swiper
          className="benefits-swiper"
          modules={[Navigation]}
          loop={true}
          centeredSlides={true}
          slidesPerView={1.5}
          spaceBetween={16}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
             if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          breakpoints={{
            768: {
              slidesPerView: 2.5,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 32,
            },
          }}
        >
          {items.map((benefit, index) => (
            <SwiperSlide key={index}>
              <Card className="bg-transparent border-primary-foreground/20 text-primary-foreground shadow-none hover:bg-primary-foreground/5 transition-colors duration-300 h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary-foreground/10 text-primary-foreground p-3 rounded-full">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline text-xl font-bold text-primary-foreground">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground/80">{benefit.description}</p>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        <div ref={prevRef} className="swiper-button swiper-button-prev"></div>
        <div ref={nextRef} className="swiper-button swiper-button-next"></div>
      </div>
    </>
  );
}
