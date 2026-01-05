import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [stars, setStars] = useState<Array<{ id: number; left: string; top: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        duration: `${2 + Math.random() * 2}s`
      }));
      setStars(newStars);
    };
    generateStars();
  }, []);

  const houses = [
    {
      name: 'Гриффиндор',
      colors: 'Красный и золотой',
      style: 'Смелые оттенки, бордовые акценты',
      traits: 'Смелость, отвага'
    },
    {
      name: 'Слизерин',
      colors: 'Зелёный и серебряный',
      style: 'Элегантные изумрудные тона',
      traits: 'Амбиции, хитрость'
    },
    {
      name: 'Когтевран',
      colors: 'Синий и бронзовый',
      style: 'Глубокие синие оттенки',
      traits: 'Ум, мудрость'
    },
    {
      name: 'Пуффендуй',
      colors: 'Жёлтый и чёрный',
      style: 'Тёплые жёлтые акценты',
      traits: 'Верность, трудолюбие'
    }
  ];

  const timeline = [
    { time: '15:00', event: 'Прибытие гостей', icon: 'Users' },
    { time: '16:00', event: 'Торжественное открытие', icon: 'Sparkles' },
    { time: '17:00', event: 'Волшебный обед', icon: 'UtensilsCrossed' },
    { time: '19:00', event: 'Магические развлечения', icon: 'Wand2' },
    { time: '20:30', event: 'Торт и поздравления', icon: 'Cake' },
    { time: '21:30', event: 'Танцы под звёздами', icon: 'Music' },
    { time: '23:00', event: 'Портал домой откроется', icon: 'Orbit' }
  ];

  const wishlist = [
    { item: 'Подарки из жизни маглов', icon: 'ShoppingCart', link: 'https://followish.io/mywishlist/gbxagpog0dy04x' },
    { item: 'Подарки из волшебного мира', icon: 'Wand2', link: 'https://followish.io/mywishlist/axwdiegpcaoj01' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-purple via-secondary-purple to-dark-purple relative overflow-hidden">
      {/* Animated stars */}
      <div className="fixed inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-gold rounded-full animate-twinkle"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
              animationDuration: star.duration
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center z-10 space-y-8 animate-fade-in max-w-4xl mx-auto">
          <div className="inline-block">
            <Icon name="Sparkles" className="w-16 h-16 text-gold mx-auto mb-4 animate-pulse" />
          </div>
          
          {/* Photo with magical frame */}
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-gold via-light-purple to-gold rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative">
              <div className="p-2 bg-gradient-to-br from-gold via-magic-purple to-gold rounded-full">
                <div className="p-1 bg-dark-purple rounded-full">
                  <img 
                    src="https://cdn.poehali.dev/files/IMG_4568.jpeg" 
                    alt="Кристина" 
                    className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-gold/30"
                  />
                </div>
              </div>
              <div className="absolute -top-2 -right-2">
                <Icon name="Sparkles" className="w-8 h-8 text-gold animate-pulse" />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <Icon name="Star" className="w-6 h-6 text-gold fill-gold animate-pulse" />
              </div>
            </div>
          </div>

          <h1 className="text-7xl md:text-9xl font-cinzel font-black text-gold" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.7), 0 0 30px rgba(212,175,55,0.5)' }}>
            Кристина
          </h1>
          <div className="space-y-2">
            <p className="text-3xl md:text-4xl text-light-purple font-cormorant font-bold italic" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
              приглашает вас в волшебный мир
            </p>
            <div className="flex items-center justify-center gap-3 text-gold">
              <div className="h-px w-20 bg-gold/50" />
              <Icon name="Star" className="w-6 h-6 fill-gold" />
              <div className="h-px w-20 bg-gold/50" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl text-light-purple font-cormorant font-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
            на празднование дня рождения
          </p>
        </div>
      </section>

      {/* Event Details */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-cinzel font-black text-gold text-center mb-12 animate-fade-in" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.3)' }}>
            Детали события
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-dark-purple/60 backdrop-blur-sm border-gold/30 hover:border-gold/60 transition-all hover-scale">
              <CardContent className="p-6 text-center space-y-3">
                <Icon name="Calendar" className="w-12 h-12 text-gold mx-auto" />
                <h3 className="text-2xl font-cinzel font-bold text-gold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>Дата</h3>
                <p className="text-light-purple font-cormorant text-xl font-semibold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>12 июня 2026</p>
              </CardContent>
            </Card>

            <Card className="bg-dark-purple/60 backdrop-blur-sm border-gold/30 hover:border-gold/60 transition-all hover-scale">
              <CardContent className="p-6 text-center space-y-3">
                <Icon name="Clock" className="w-12 h-12 text-gold mx-auto" />
                <h3 className="text-2xl font-cinzel font-bold text-gold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>Время</h3>
                <p className="text-light-purple font-cormorant text-xl font-semibold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>15:00</p>
              </CardContent>
            </Card>

            <Card className="bg-dark-purple/60 backdrop-blur-sm border-gold/30 hover:border-gold/60 transition-all hover-scale">
              <CardContent className="p-6 text-center space-y-3">
                <Icon name="MapPin" className="w-12 h-12 text-gold mx-auto" />
                <h3 className="text-2xl font-cinzel font-bold text-gold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>Место</h3>
                <p className="text-light-purple font-cormorant text-xl font-semibold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>Беседка, санаторий Крона</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-20 px-4 bg-dark-purple/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-cinzel font-black text-gold text-center mb-12" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.3)' }}>
            Тайминг вечера
          </h2>
          
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <Card 
                key={index}
                className="bg-secondary-purple/40 backdrop-blur-sm border-gold/20 hover:border-gold/50 transition-all animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                      <Icon name={item.icon as any} className="w-8 h-8 text-gold" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-4">
                      <span className="text-3xl font-cinzel font-bold text-gold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>{item.time}</span>
                      <span className="text-2xl text-light-purple font-cormorant font-semibold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>{item.event}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dress Code */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-cinzel font-black text-gold text-center mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.3)' }}>
            Дресс-код Хогвартса
          </h2>
          <p className="text-center text-light-purple font-cormorant text-xl md:text-2xl font-bold mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Выберите свой факультет и оденьтесь в его цветах
          </p>
          <div className="text-center mb-12">
            <p className="text-lg md:text-xl text-gold font-cormorant font-bold inline-flex items-center justify-center gap-2 animate-pulse" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              <Icon name="Award" className="w-6 h-6" />
              Или выберите образ любимого персонажа и выиграйте главный приз в конкурсе костюмов!
              <Icon name="Award" className="w-6 h-6" />
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {houses.map((house, index) => (
              <Card 
                key={index}
                className="bg-dark-purple/50 backdrop-blur-sm border-gold/30 hover:border-gold/60 transition-all hover-scale animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    <Icon name="Shield" className="w-12 h-12 text-gold mx-auto mb-3" />
                    <h3 className="text-3xl font-cinzel font-bold text-gold mb-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>{house.name}</h3>
                    <Badge className="bg-gold/20 text-gold border-gold/40 text-base font-semibold">{house.traits}</Badge>
                  </div>
                  <div className="space-y-2 text-light-purple font-cormorant text-lg font-semibold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                    <p><strong className="text-gold text-xl">Цвета:</strong> {house.colors}</p>
                    <p><strong className="text-gold text-xl">Стиль:</strong> {house.style}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Photo Grid with Color Circles */}
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="aspect-square overflow-hidden rounded-2xl border-2 border-gold/30 hover:border-gold/60 transition-all hover-scale">
                <img src="https://cdn.poehali.dev/files/IMG_0791.jpeg" alt="Хогвартс" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square overflow-hidden rounded-2xl border-2 border-gold/30 hover:border-gold/60 transition-all hover-scale">
                <img src="https://cdn.poehali.dev/files/IMG_0790.jpeg" alt="Волшебники" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square overflow-hidden rounded-2xl border-2 border-gold/30 hover:border-gold/60 transition-all hover-scale">
                <img src="https://cdn.poehali.dev/files/IMG_0789.jpeg" alt="Урок магии" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square overflow-hidden rounded-2xl border-2 border-gold/30 hover:border-gold/60 transition-all hover-scale">
                <img src="https://cdn.poehali.dev/files/IMG_0788.jpeg" alt="Травология" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Color Palette Circles */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="w-16 h-16 rounded-full bg-[#740001] border-4 border-gold/50 hover-scale" title="Гриффиндор - Красный"></div>
              <div className="w-16 h-16 rounded-full bg-[#D4AF37] border-4 border-gold/50 hover-scale" title="Золотой"></div>
              <div className="w-16 h-16 rounded-full bg-[#1A472A] border-4 border-gold/50 hover-scale" title="Слизерин - Зелёный"></div>
              <div className="w-16 h-16 rounded-full bg-[#0E1A40] border-4 border-gold/50 hover-scale" title="Когтевран - Синий"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Wishlist */}
      <section className="relative py-20 px-4 bg-dark-purple/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-cinzel font-black text-gold mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.3)' }}>
            Вишлист
          </h2>
          <p className="text-xl md:text-2xl text-light-purple font-cormorant font-bold mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Если хотите порадовать именинницу подарком
          </p>
          <p className="text-lg md:text-xl text-gold/90 font-cormorant font-semibold mb-12 animate-pulse" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            ⚠️ Обязательно бронируйте подарки заранее!
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {wishlist.map((item, index) => (
              <Card 
                key={index}
                className="bg-secondary-purple/40 backdrop-blur-sm border-gold/30 hover:border-gold/60 transition-all cursor-pointer hover-scale animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 space-y-4">
                  <Icon name={item.icon as any} className="w-16 h-16 text-gold mx-auto" />
                  <p className="text-light-purple font-cormorant text-2xl font-bold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>{item.item}</p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="pt-2 bg-gold/20 hover:bg-gold/30 rounded-lg py-3 px-4 transition-all">
                      <span className="text-gold text-lg font-cinzel font-bold flex items-center justify-center gap-2">
                        Открыть вишлист <Icon name="ExternalLink" className="w-5 h-5" />
                      </span>
                    </div>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Marauder's Map Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-5xl md:text-6xl font-cinzel font-black text-gold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.3)' }}>
              Карта Мародёров
            </h2>
            <p className="text-2xl text-light-purple font-cormorant font-bold italic" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              "Торжественно клянусь, что замышляю шалость"
            </p>
          </div>

          <div className="relative">
            {/* Parchment-style container */}
            <div className="bg-[#F4E8D0] rounded-lg p-6 md:p-8 shadow-2xl border-4 border-[#8B7355] relative overflow-hidden">
              {/* Aged paper texture overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-50"></div>
              
              {/* Animated Footprints - Marauder's Map style */}
              <div className="absolute top-[15%] left-[10%] animate-footsteps-1">
                <Icon name="Footprints" className="w-6 h-6 text-[#8B7355]/60" />
              </div>
              <div className="absolute top-[20%] left-[15%] animate-footsteps-1" style={{ animationDelay: '0.3s' }}>
                <Icon name="Footprints" className="w-6 h-6 text-[#8B7355]/60 rotate-12" />
              </div>
              <div className="absolute top-[25%] left-[20%] animate-footsteps-1" style={{ animationDelay: '0.6s' }}>
                <Icon name="Footprints" className="w-6 h-6 text-[#8B7355]/60 -rotate-6" />
              </div>

              <div className="absolute top-[60%] right-[20%] animate-footsteps-2">
                <Icon name="Footprints" className="w-5 h-5 text-[#6B5335]/50 rotate-45" />
              </div>
              <div className="absolute top-[55%] right-[25%] animate-footsteps-2" style={{ animationDelay: '0.4s' }}>
                <Icon name="Footprints" className="w-5 h-5 text-[#6B5335]/50 rotate-[60deg]" />
              </div>

              <div className="absolute bottom-[20%] left-[40%] animate-footsteps-3">
                <Icon name="Footprints" className="w-5 h-5 text-[#4A3728]/40 -rotate-12" />
              </div>
              <div className="absolute bottom-[25%] left-[45%] animate-footsteps-3" style={{ animationDelay: '0.5s' }}>
                <Icon name="Footprints" className="w-5 h-5 text-[#4A3728]/40 rotate-6" />
              </div>
              <div className="absolute bottom-[30%] left-[50%] animate-footsteps-3" style={{ animationDelay: '1s' }}>
                <Icon name="Footprints" className="w-5 h-5 text-[#4A3728]/40 -rotate-3" />
              </div>

              <div className="relative z-10">
                {/* Location info */}
                <div className="text-center mb-6 space-y-2">
                  <h3 className="text-3xl font-cinzel font-bold text-[#2C1810]">Санаторий "Крона"</h3>
                  <p className="text-xl font-cormorant font-semibold text-[#4A3728] flex items-center justify-center gap-2">
                    <Icon name="MapPin" className="w-5 h-5" />
                    г. Бердск, Новосибирская область
                  </p>
                </div>

                {/* Interactive map */}
                <div className="relative rounded-lg overflow-hidden border-4 border-[#8B7355] shadow-inner mb-6">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad9b5a1c8c9b2e3f4a5b6c7d8e9f0a1b2&amp;source=constructor"
                    width="100%"
                    height="400"
                    frameBorder="0"
                    className="w-full h-[400px] grayscale-[30%] sepia-[20%]"
                    title="Карта проезда"
                  ></iframe>
                  {/* Map overlay with magical effect */}
                  <div className="absolute inset-0 pointer-events-none border-2 border-[#2C1810]/20"></div>
                </div>

                {/* Wand tap instruction */}
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-[#2C1810]">
                    <Icon name="Wand2" className="w-6 h-6" />
                    <p className="text-lg font-cormorant font-bold italic">
                      Коснитесь карты волшебной палочкой для навигации
                    </p>
                    <Icon name="Wand2" className="w-6 h-6 rotate-180" />
                  </div>
                  <a 
                    href="https://yandex.ru/maps/?text=Санаторий Крона Бердск"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#8B7355] hover:bg-[#6B5335] text-[#F4E8D0] px-6 py-3 rounded-lg font-cinzel font-bold transition-all hover-scale"
                  >
                    <span className="flex items-center gap-2">
                      <Icon name="Navigation" className="w-5 h-5" />
                      Открыть в Яндекс.Картах
                      <Icon name="ExternalLink" className="w-4 h-4" />
                    </span>
                  </a>
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-[#2C1810]/30"></div>
              <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-[#2C1810]/30"></div>
              <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-[#2C1810]/30"></div>
              <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-[#2C1810]/30"></div>
            </div>

            {/* Wand sparkles around the map */}
            <div className="absolute -top-4 -left-4 animate-pulse">
              <Icon name="Sparkles" className="w-8 h-8 text-gold" />
            </div>
            <div className="absolute -top-4 -right-4 animate-pulse" style={{ animationDelay: '0.5s' }}>
              <Icon name="Sparkles" className="w-8 h-8 text-gold" />
            </div>
            <div className="absolute -bottom-4 -left-4 animate-pulse" style={{ animationDelay: '1s' }}>
              <Icon name="Sparkles" className="w-8 h-8 text-gold" />
            </div>
            <div className="absolute -bottom-4 -right-4 animate-pulse" style={{ animationDelay: '1.5s' }}>
              <Icon name="Sparkles" className="w-8 h-8 text-gold" />
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-dark-purple/60 backdrop-blur-sm border-2 border-gold/40 rounded-2xl p-8 md:p-12 space-y-6">
            <Icon name="Mail" className="w-16 h-16 text-gold mx-auto animate-pulse" />
            <h3 className="text-3xl md:text-4xl font-cinzel font-black text-gold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Пошлите сову с ответом!
            </h3>
            <p className="text-xl md:text-2xl text-light-purple font-cormorant font-bold leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              Если вы получили это волшебное приглашение, обязательно пошлите сову имениннице с подтверждением — придёте вы на праздник или нет
            </p>
            <div className="pt-4">
              <Icon name="Bird" className="w-12 h-12 text-gold/60 mx-auto animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Magical Chat Section */}
      <section className="relative py-16 px-4 bg-dark-purple/40">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-magic-purple/60 to-dark-purple/60 backdrop-blur-sm border-2 border-gold/50 rounded-2xl p-8 md:p-12 space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Icon name="MessageCircle" className="w-12 h-12 text-gold animate-pulse" />
              <h3 className="text-3xl md:text-4xl font-cinzel font-black text-gold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Волшебный чат гостей
              </h3>
              <Icon name="Sparkles" className="w-12 h-12 text-gold animate-pulse" />
            </div>
            <p className="text-xl md:text-2xl text-light-purple font-cormorant font-bold leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              Для тех, кто точно будет в этот день с нами, есть волшебный чат!
              <br />
              Скорее вступай и не пропусти всё самое важное 🪄
            </p>
            <a 
              href="https://t.me/+ueXQ5PBXV0tiNzZi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <div className="bg-gold/20 hover:bg-gold/40 border-2 border-gold rounded-xl py-4 px-8 transition-all hover-scale">
                <span className="text-gold text-2xl font-cinzel font-bold flex items-center justify-center gap-3">
                  <Icon name="Send" className="w-7 h-7" />
                  Вступить в чат
                  <Icon name="ExternalLink" className="w-6 h-6" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 text-center">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Icon name="Sparkles" className="w-5 h-5 text-gold animate-pulse" />
            <p className="text-light-purple/60 font-cormorant text-lg italic">
              До встречи в волшебном мире!
            </p>
            <Icon name="Sparkles" className="w-5 h-5 text-gold animate-pulse" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;