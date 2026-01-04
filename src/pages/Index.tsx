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
    { time: '18:00', event: 'Прибытие гостей', icon: 'Users' },
    { time: '18:30', event: 'Торжественное открытие', icon: 'Sparkles' },
    { time: '19:00', event: 'Волшебный ужин', icon: 'UtensilsCrossed' },
    { time: '20:30', event: 'Магические развлечения', icon: 'Wand2' },
    { time: '21:00', event: 'Торт и поздравления', icon: 'Cake' },
    { time: '22:00', event: 'Танцы под звёздами', icon: 'Music' }
  ];

  const wishlist = [
    { item: 'Вишлист на Ozon', icon: 'Gift', link: '#' },
    { item: 'Вишлист на Wildberries', icon: 'ShoppingBag', link: '#' },
    { item: 'Книги по магии', icon: 'BookOpen', link: '#' }
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
        <div className="text-center z-10 space-y-8 animate-fade-in">
          <div className="inline-block">
            <Icon name="Sparkles" className="w-16 h-16 text-gold mx-auto mb-4 animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-8xl font-cinzel font-bold text-gold drop-shadow-2xl">
            Кристина
          </h1>
          <div className="space-y-2">
            <p className="text-2xl md:text-3xl text-light-purple font-cormorant italic">
              приглашает вас в волшебный мир
            </p>
            <div className="flex items-center justify-center gap-3 text-gold">
              <div className="h-px w-20 bg-gold/50" />
              <Icon name="Star" className="w-6 h-6 fill-gold" />
              <div className="h-px w-20 bg-gold/50" />
            </div>
          </div>
          <p className="text-xl md:text-2xl text-light-purple/90 font-cormorant">
            на празднование дня рождения
          </p>
        </div>
      </section>

      {/* Event Details */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-gold text-center mb-12 animate-fade-in">
            Детали события
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-dark-purple/60 backdrop-blur-sm border-gold/30 hover:border-gold/60 transition-all hover-scale">
              <CardContent className="p-6 text-center space-y-3">
                <Icon name="Calendar" className="w-12 h-12 text-gold mx-auto" />
                <h3 className="text-xl font-cinzel text-gold">Дата</h3>
                <p className="text-light-purple font-cormorant text-lg">12 июня 2026</p>
              </CardContent>
            </Card>

            <Card className="bg-dark-purple/60 backdrop-blur-sm border-gold/30 hover:border-gold/60 transition-all hover-scale">
              <CardContent className="p-6 text-center space-y-3">
                <Icon name="Clock" className="w-12 h-12 text-gold mx-auto" />
                <h3 className="text-xl font-cinzel text-gold">Время</h3>
                <p className="text-light-purple font-cormorant text-lg">18:00</p>
              </CardContent>
            </Card>

            <Card className="bg-dark-purple/60 backdrop-blur-sm border-gold/30 hover:border-gold/60 transition-all hover-scale">
              <CardContent className="p-6 text-center space-y-3">
                <Icon name="MapPin" className="w-12 h-12 text-gold mx-auto" />
                <h3 className="text-xl font-cinzel text-gold">Место</h3>
                <p className="text-light-purple font-cormorant text-lg">Беседка, санаторий Крона</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-20 px-4 bg-dark-purple/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-gold text-center mb-12">
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
                      <span className="text-2xl font-cinzel text-gold">{item.time}</span>
                      <span className="text-xl text-light-purple font-cormorant">{item.event}</span>
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
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-gold text-center mb-6">
            Дресс-код Хогвартса
          </h2>
          <p className="text-center text-light-purple/80 font-cormorant text-lg mb-12">
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
                    <h3 className="text-2xl font-cinzel text-gold mb-2">{house.name}</h3>
                    <Badge className="bg-gold/20 text-gold border-gold/40">{house.traits}</Badge>
                  </div>
                  <div className="space-y-2 text-light-purple/90 font-cormorant">
                    <p><strong className="text-gold">Цвета:</strong> {house.colors}</p>
                    <p><strong className="text-gold">Стиль:</strong> {house.style}</p>
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
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-gold mb-6">
            Вишлист
          </h2>
          <p className="text-light-purple/80 font-cormorant text-lg mb-12">
            Если хотите порадовать именинницу подарком
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {wishlist.map((item, index) => (
              <Card 
                key={index}
                className="bg-secondary-purple/40 backdrop-blur-sm border-gold/30 hover:border-gold/60 transition-all cursor-pointer hover-scale animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 space-y-4">
                  <Icon name={item.icon as any} className="w-12 h-12 text-gold mx-auto" />
                  <p className="text-light-purple font-cormorant text-lg">{item.item}</p>
                  <div className="pt-2">
                    <span className="text-gold text-sm font-cinzel flex items-center justify-center gap-2">
                      Перейти <Icon name="ExternalLink" className="w-4 h-4" />
                    </span>
                  </div>
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