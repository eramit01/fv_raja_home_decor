import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Banner } from '../services/banner.service';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface BannerSliderProps {
  banners: Banner[];
}

export const BannerSlider = ({ banners }: BannerSliderProps) => {
  if (!banners || banners.length === 0) return null;

  return (
    <div className="mb-6">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={10}
        slidesPerView={1}
        grabCursor={true}
        navigation={true}
        loop={true}
        preventClicks={true}
        preventClicksPropagation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="flipkart-banner-swiper group"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner._id}>
            <Link to={banner.link || '#'} draggable="false">
              <div className="w-full overflow-hidden bg-gray-100 flex items-center justify-center max-h-40 sm:max-h-56 md:max-h-72 lg:max-h-80 xl:max-h-96">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-contain pointer-events-none"
                  loading="lazy"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
