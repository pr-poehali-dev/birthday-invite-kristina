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
    { time: '15:30', event: 'Торжественное открытие', icon: 'Sparkles' },
    { time: '16:00', event: 'Волшебный обед', icon: 'UtensilsCrossed' },
    { time: '17:30', event: 'Магические развлечения', icon: 'Wand2' },
    { time: '18:00', event: 'Торт и поздравления', icon: 'Cake' },
    { time: '19:00', event: 'Танцы под звёздами', icon: 'Music' }
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
          <p className="text-center text-light-purple font-cormorant text-xl md:text-2xl font-bold mb-12" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Выберите свой факультет и оденьтесь в его цветах
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Footer */}
      <footer className="relative py-12 px-4 text-center">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Icon name="Sparkles" className="w-5 h-5 text-gold animate-pulse" />
            <p className="text-light-purple/60 font-cormorant italic">
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