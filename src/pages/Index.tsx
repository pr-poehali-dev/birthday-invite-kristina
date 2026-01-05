import { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [stars, setStars] = useState<Array<{ id: number; left: string; top: string; delay: string; duration: string }>>([]);
  const [spellInput, setSpellInput] = useState('');
  const [isSecretRevealed, setIsSecretRevealed] = useState(false);
  const [showSortingHat, setShowSortingHat] = useState(false);
  const [sortedHouse, setSortedHouse] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isMcGonagall, setIsMcGonagall] = useState(false);
  const [showSnitchGame, setShowSnitchGame] = useState(false);
  const [snitchPosition, setSnitchPosition] = useState({ x: 50, y: 50 });
  const [snitchCaught, setSnitchCaught] = useState(0);
  const [showSpellBook, setShowSpellBook] = useState(false);
  const [showMagicRules, setShowMagicRules] = useState(false);
  const [balloons, setBalloons] = useState<Array<{ id: number; left: string; delay: string; duration: string; number: string }>>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const owlSoundRef = useRef<HTMLAudioElement | null>(null);
  const hatSoundRef = useRef<HTMLAudioElement | null>(null);
  const avadaSoundRef = useRef<HTMLAudioElement | null>(null);

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

    // Generate floating balloons with numbers 2 and 5
    const generateBalloons = () => {
      const newBalloons = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 90 + 5}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${15 + Math.random() * 10}s`,
        number: i % 2 === 0 ? '2' : '5'
      }));
      setBalloons(newBalloons);
    };
    generateBalloons();

    // Toggle between Kristina and McGonagall every 2 seconds
    const nameToggle = setInterval(() => {
      setIsMcGonagall(prev => !prev);
    }, 2000);

    // Magical theme music (Harry Potter style)
    audioRef.current = new Audio('https://cdn.poehali.dev/projects/8fcac141-9992-4fa7-88d4-e8c8df86bc00/files/harry-potter-theme.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    // Auto-play music when page loads
    const playAudio = async () => {
      try {
        await audioRef.current?.play();
      } catch (error) {
        // If autoplay is blocked, play on first user interaction
        const handleFirstInteraction = async () => {
          try {
            await audioRef.current?.play();
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
          } catch (e) {
            console.log('Audio play failed:', e);
          }
        };
        
        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);
      }
    };
    
    // Delay slightly to ensure audio element is ready
    setTimeout(playAudio, 500);

    // Sound effects setup
    owlSoundRef.current = new Audio('https://www.soundjay.com/nature/sounds/owl-sound-2.mp3');
    hatSoundRef.current = new Audio('https://www.soundjay.com/misc/sounds/magic-chime-01.mp3');
    avadaSoundRef.current = new Audio('https://www.soundjay.com/misc/sounds/magic-power-up-01.mp3');

    return () => {
      clearInterval(nameToggle);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);



  const checkSpell = () => {
    const correctSpells = ['алохомора', 'alohomora', 'люмос', 'lumos'];
    if (correctSpells.includes(spellInput.toLowerCase().trim())) {
      owlSoundRef.current?.play();
      setIsSecretRevealed(true);
      setSpellInput('');
    } else {
      alert('Неправильное заклинание! Попробуйте ещё раз... 🪄');
      setSpellInput('');
    }
  };

  const sortingQuestions = [
    {
      question: 'Какое качество для вас важнее всего?',
      options: [
        { text: 'Храбрость', house: 0 },
        { text: 'Ум', house: 1 },
        { text: 'Честность', house: 2 },
        { text: 'Амбиции', house: 3 }
      ]
    },
    {
      question: 'Как вы проводите свободное время?',
      options: [
        { text: 'Приключения и спорт', house: 0 },
        { text: 'Чтение и учёба', house: 1 },
        { text: 'Помощь друзьям', house: 2 },
        { text: 'Работаю над целями', house: 3 }
      ]
    },
    {
      question: 'Что вы выберете в сложной ситуации?',
      options: [
        { text: 'Действовать смело', house: 0 },
        { text: 'Обдумать решение', house: 1 },
        { text: 'Попросить совета', house: 2 },
        { text: 'Найти выгоду', house: 3 }
      ]
    }
  ];

  const handleAnswer = (houseIndex: number) => {
    const newAnswers = [...answers, houseIndex];
    setAnswers(newAnswers);

    if (currentQuestion < sortingQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      hatSoundRef.current?.play();
      const houseCounts = [0, 0, 0, 0];
      newAnswers.forEach(a => houseCounts[a]++);
      const maxIndex = houseCounts.indexOf(Math.max(...houseCounts));
      const houseNames = ['Гриффиндор', 'Когтевран', 'Пуффендуй', 'Слизерин'];
      setSortedHouse(houseNames[maxIndex]);
    }
  };

  const resetSorting = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSortedHouse(null);
    setShowSortingHat(false);
  };

  const calculateTimeLeft = () => {
    const eventDate = new Date('2026-06-13T15:00:00');
    const now = new Date();
    const difference = eventDate.getTime() - now.getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Snitch game logic
  const moveSnitch = () => {
    setSnitchPosition({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10
    });
  };

  const catchSnitch = () => {
    setSnitchCaught(prev => prev + 1);
    hatSoundRef.current?.play();
    moveSnitch();
  };

  useEffect(() => {
    if (showSnitchGame) {
      const snitchTimer = setInterval(moveSnitch, 2000);
      return () => clearInterval(snitchTimer);
    }
  }, [showSnitchGame]);

  // Add to calendar function
  const addToCalendar = () => {
    const event = {
      title: 'День Рождения Кристины - Хогвартс',
      description: 'Волшебный праздник в стиле Гарри Поттера',
      location: 'Беседка, санаторий Крона, г. Бердск',
      startDate: '2026-06-13T15:00:00',
      endDate: '2026-06-13T23:00:00'
    };
    
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&dates=${event.startDate.replace(/[-:]/g, '')}/${event.endDate.replace(/[-:]/g, '')}`;
    
    window.open(googleCalUrl, '_blank');
  };

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
      {/* Countdown Timer */}
      <div className="fixed top-6 left-6 z-50 bg-dark-purple/80 backdrop-blur-sm border-2 border-gold/50 rounded-xl p-4 shadow-2xl">
        <div className="text-center space-y-2">
          <p className="text-gold font-cinzel text-sm font-bold flex items-center gap-2">
            <Icon name="Clock" className="w-4 h-4" />
            До праздника
          </p>
          <div className="flex gap-2 text-light-purple">
            <div className="flex flex-col items-center bg-magic-purple/30 rounded-lg p-2 min-w-[50px]">
              <span className="text-2xl font-cinzel font-bold text-gold">{timeLeft.days}</span>
              <span className="text-xs font-cormorant">дней</span>
            </div>
            <div className="flex flex-col items-center bg-magic-purple/30 rounded-lg p-2 min-w-[50px]">
              <span className="text-2xl font-cinzel font-bold text-gold">{timeLeft.hours}</span>
              <span className="text-xs font-cormorant">часов</span>
            </div>
            <div className="flex flex-col items-center bg-magic-purple/30 rounded-lg p-2 min-w-[50px]">
              <span className="text-2xl font-cinzel font-bold text-gold">{timeLeft.minutes}</span>
              <span className="text-xs font-cormorant">минут</span>
            </div>
          </div>
        </div>
      </div>

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

      {/* Flying foil balloons shaped as numbers 2 and 5 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className="absolute animate-float-up"
            style={{
              left: balloon.left,
              bottom: '-300px',
              animationDelay: balloon.delay,
              animationDuration: balloon.duration
            }}
          >
            <div className="relative foil-balloon">
              <svg viewBox="0 0 120 180" className="w-32 h-48 drop-shadow-2xl" style={{ filter: 'drop-shadow(0 10px 25px rgba(212, 175, 55, 0.5))' }}>
                <defs>
                  <linearGradient id={`goldGradient${balloon.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                    <stop offset="25%" style={{ stopColor: '#FFF8DC', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                    <stop offset="75%" style={{ stopColor: '#DAA520', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#B8860B', stopOpacity: 1 }} />
                  </linearGradient>
                  <filter id={`shine${balloon.id}`}>
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                    <feOffset dx="2" dy="2" result="offsetblur"/>
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.5"/>
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {balloon.number === '2' ? (
                  <path 
                    d="M 30 30 Q 30 10, 50 10 Q 70 10, 70 30 Q 70 50, 50 60 L 70 90 Q 70 100, 60 100 L 30 100 Q 20 100, 20 90 L 50 60 Q 30 50, 30 30 Z" 
                    fill={`url(#goldGradient${balloon.id})`}
                    stroke="#DAA520"
                    strokeWidth="2"
                    filter={`url(#shine${balloon.id})`}
                  />
                ) : (
                  <path 
                    d="M 30 10 Q 40 10, 40 20 L 40 40 Q 40 50, 50 50 Q 60 50, 60 60 L 60 90 Q 60 100, 50 100 Q 40 100, 40 90 L 40 60 L 30 60 Q 20 60, 20 50 L 50 50 L 50 20 Q 50 10, 60 10 L 70 10" 
                    fill={`url(#goldGradient${balloon.id})`}
                    stroke="#DAA520"
                    strokeWidth="2"
                    filter={`url(#shine${balloon.id})`}
                  />
                )}
                
                <ellipse cx="60" cy="40" rx="15" ry="25" fill="rgba(255, 255, 255, 0.4)" opacity="0.6" />
              </svg>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-20 bg-gold/60"></div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-20 w-3 h-3 bg-gold rounded-full shadow-lg"></div>
            </div>
          </div>
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
                    src={isMcGonagall ? "https://cdn.poehali.dev/projects/8fcac141-9992-4fa7-88d4-e8c8df86bc00/files/54bc7bf1-32c8-43bb-bf92-9c299e18673a.jpg" : "https://cdn.poehali.dev/files/IMG_4568.jpeg"}
                    alt={isMcGonagall ? "Профессор Макгонагал" : "Кристина"}
                    className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-gold/30 transition-all duration-1000"
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

          <h1 className="font-cinzel font-black text-gold transition-all duration-1000" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.7), 0 0 30px rgba(212,175,55,0.5)' }}>
            {isMcGonagall ? (
              <span className="text-4xl md:text-6xl bg-gradient-to-r from-gold via-light-purple to-gold bg-clip-text text-transparent animate-pulse">
                Профессор Макгонагал
              </span>
            ) : (
              <span className="text-7xl md:text-9xl">Кристина</span>
            )}
          </h1>
          <div className="space-y-2">
            <p className="text-3xl md:text-4xl text-light-purple font-cormorant font-bold italic" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
              приглашает вас в волшебный мир
            </p>
            <p className="text-2xl md:text-3xl text-gold font-cinzel font-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
              🎈 Юбилей - 25 лет! 🎈
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

      {/* Secret Section with Spell */}
      <section className="relative py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {!isSecretRevealed ? (
            <div className="bg-dark-purple/70 backdrop-blur-sm border-2 border-gold/30 rounded-2xl p-8 space-y-6">
              <Icon name="Lock" className="w-16 h-16 text-gold mx-auto animate-pulse" />
              <h3 className="text-3xl font-cinzel font-black text-gold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Секретное послание
              </h3>
              <p className="text-xl text-light-purple font-cormorant font-bold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                Произнесите заклинание открытия, чтобы узнать секрет...
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <Input
                  type="text"
                  placeholder="Введите заклинание..."
                  value={spellInput}
                  onChange={(e) => setSpellInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkSpell()}
                  className="bg-magic-purple/30 border-gold/40 text-light-purple placeholder:text-light-purple/50 font-cormorant text-lg"
                />
                <Button
                  onClick={checkSpell}
                  className="bg-gold/20 hover:bg-gold/40 border-2 border-gold text-gold font-cinzel font-bold"
                >
                  <Icon name="Wand2" className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-sm text-gold/70 font-cormorant italic">Подсказка: заклинание открытия дверей</p>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gold/20 to-magic-purple/40 backdrop-blur-sm border-2 border-gold rounded-2xl p-8 space-y-4 animate-fade-in">
              <Icon name="Unlock" className="w-16 h-16 text-gold mx-auto animate-pulse" />
              <h3 className="text-3xl font-cinzel font-black text-gold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Секрет раскрыт! 🎉
              </h3>
              <p className="text-2xl text-light-purple font-cormorant font-bold leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                На празднике будет особый сюрприз для тех, кто придёт в лучшем костюме! Главный приз — волшебная награда от именинницы ✨
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Sorting Hat Section */}
      <section className="relative py-16 px-4 bg-dark-purple/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-cinzel font-black text-gold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.3)' }}>
              Распределяющая Шляпа
            </h2>
            <p className="text-xl text-light-purple font-cormorant font-bold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              Узнай свой факультет в Хогвартсе!
            </p>
          </div>

          {!showSortingHat ? (
            <div className="text-center space-y-6">
              <div className="max-w-xs mx-auto mb-4">
                <img 
                  src="https://cdn.poehali.dev/projects/8fcac141-9992-4fa7-88d4-e8c8df86bc00/files/545bcb61-a0ef-420e-a355-2be57246a49f.jpg" 
                  alt="Распределяющая Шляпа" 
                  className="w-full h-auto rounded-xl border-2 border-gold/30 shadow-2xl"
                />
              </div>
              <Button
                onClick={() => setShowSortingHat(true)}
                className="bg-gold/20 hover:bg-gold/40 border-2 border-gold text-gold font-cinzel font-bold text-sm px-5 py-3 rounded-xl hover-scale"
              >
                <Icon name="Sparkles" className="w-4 h-4 mr-2" />
                Надеть Распределяющую Шляпу
                <Icon name="Sparkles" className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ) : !sortedHouse ? (
            <Card className="bg-secondary-purple/40 backdrop-blur-sm border-gold/30">
              <CardContent className="p-8 space-y-6">
                <div className="text-center">
                  <Icon name="GraduationCap" className="w-20 h-20 text-gold mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-cinzel font-bold text-gold mb-4">
                    {sortingQuestions[currentQuestion].question}
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {sortingQuestions[currentQuestion].options.map((option, idx) => (
                    <Button
                      key={idx}
                      onClick={() => handleAnswer(option.house)}
                      className="bg-dark-purple/60 hover:bg-gold/30 border-2 border-gold/40 hover:border-gold text-light-purple hover:text-gold font-cormorant font-bold text-lg py-6 transition-all hover-scale"
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-center gap-2 pt-4">
                  {sortingQuestions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-3 h-3 rounded-full ${idx <= currentQuestion ? 'bg-gold' : 'bg-gold/20'}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gradient-to-br from-gold/30 to-magic-purple/50 backdrop-blur-sm border-4 border-gold animate-fade-in">
              <CardContent className="p-12 space-y-6 text-center">
                <Icon name="Award" className="w-24 h-24 text-gold mx-auto animate-pulse" />
                <h3 className="text-4xl md:text-5xl font-cinzel font-black text-gold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                  {sortedHouse}!
                </h3>
                <p className="text-2xl text-light-purple font-cormorant font-bold leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Шляпа определила твой факультет! Носи его цвета с гордостью на празднике! 🎓✨
                </p>
                <Button
                  onClick={resetSorting}
                  className="bg-gold/20 hover:bg-gold/40 border-2 border-gold text-gold font-cinzel font-bold mt-6"
                >
                  Пройти ещё раз
                </Button>
              </CardContent>
            </Card>
          )}
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
                <p className="text-light-purple font-cormorant text-xl font-semibold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>13 июня 2026</p>
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

      {/* Magical Zones */}
      <section className="relative py-20 px-4 bg-dark-purple/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-cinzel font-black text-gold text-center mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.3)' }}>
            Волшебные зоны праздника
          </h2>
          <p className="text-center text-light-purple font-cormorant text-xl md:text-2xl font-bold mb-12" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Каждая зона полна магии и сюрпризов
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Zone 1: Вкусная еда */}
            <Card className="bg-secondary-purple/40 backdrop-blur-sm border-gold/30 hover:border-gold/60 transition-all hover-scale animate-fade-in overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/8fcac141-9992-4fa7-88d4-e8c8df86bc00/files/bc235a87-9a39-4f9e-9496-a8d349121743.jpg" 
                  alt="Вкусная еда" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-purple via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <Icon name="UtensilsCrossed" className="w-8 h-8 text-gold animate-pulse" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-cinzel font-bold text-gold mb-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Вкусная еда
                </h3>
                <p className="text-light-purple font-cormorant text-lg" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Волшебный пир с изысканными угощениями достойными Большого Зала Хогвартса
                </p>
              </CardContent>
            </Card>

            {/* Zone 2: Послание в будущее */}
            <Card className="bg-secondary-purple/40 backdrop-blur-sm border-gold/30 hover:border-gold/60 transition-all hover-scale animate-fade-in overflow-hidden group" style={{ animationDelay: '0.1s' }}>
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/8fcac141-9992-4fa7-88d4-e8c8df86bc00/files/69adc289-62b1-4caa-81af-0b68e49d8481.jpg" 
                  alt="Послание в будущее" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-purple via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <Icon name="Mail" className="w-8 h-8 text-gold animate-pulse" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-cinzel font-bold text-gold mb-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Послание имениннице в будущее
                </h3>
                <p className="text-light-purple font-cormorant text-lg" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Оставь магическое пожелание для именинницы, которое она получит в будущем
                </p>
              </CardContent>
            </Card>

            {/* Zone 3: Фотозона */}
            <Card className="bg-secondary-purple/40 backdrop-blur-sm border-gold/30 hover:border-gold/60 transition-all hover-scale animate-fade-in overflow-hidden group" style={{ animationDelay: '0.2s' }}>
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/8fcac141-9992-4fa7-88d4-e8c8df86bc00/files/fb3bf6f2-f02c-4ff2-8395-f26e5231d41e.jpg" 
                  alt="Фотозона" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-purple via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <Icon name="Camera" className="w-8 h-8 text-gold animate-pulse" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-cinzel font-bold text-gold mb-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Фотозона
                </h3>
                <p className="text-light-purple font-cormorant text-lg" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Запечатлей волшебные моменты с магическими реквизитами и декорациями
                </p>
              </CardContent>
            </Card>

            {/* Zone 4: Мастер-классы */}
            <Card className="bg-secondary-purple/40 backdrop-blur-sm border-gold/30 hover:border-gold/60 transition-all hover-scale animate-fade-in overflow-hidden group" style={{ animationDelay: '0.3s' }}>
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/8fcac141-9992-4fa7-88d4-e8c8df86bc00/files/7e0a5d72-c8d3-47e7-924d-76b1fd5b82f4.jpg" 
                  alt="Мастер-классы" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-purple via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <Icon name="Wand2" className="w-8 h-8 text-gold animate-pulse" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-cinzel font-bold text-gold mb-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Волшебные мастер-классы
                </h3>
                <p className="text-light-purple font-cormorant text-lg" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Освой магические ремесла и создай волшебные артефакты своими руками
                </p>
              </CardContent>
            </Card>

            {/* Zone 5: Фотограф */}
            <Card className="bg-secondary-purple/40 backdrop-blur-sm border-gold/30 hover:border-gold/60 transition-all hover-scale animate-fade-in overflow-hidden group" style={{ animationDelay: '0.4s' }}>
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/8fcac141-9992-4fa7-88d4-e8c8df86bc00/files/475a419e-4db2-44d7-ae9e-ef4a187ccc64.jpg" 
                  alt="Фотограф" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-purple via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <Icon name="Camera" className="w-8 h-8 text-gold animate-pulse" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-cinzel font-bold text-gold mb-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Фотозона и Фотограф
                </h3>
                <p className="text-light-purple font-cormorant text-lg" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Профессиональный волшебник с камерой запечатлит все магические моменты
                </p>
              </CardContent>
            </Card>

            {/* Zone 6: Викторина */}
            <Card className="bg-secondary-purple/40 backdrop-blur-sm border-gold/30 hover:border-gold/60 transition-all hover-scale animate-fade-in overflow-hidden group" style={{ animationDelay: '0.5s' }}>
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/8fcac141-9992-4fa7-88d4-e8c8df86bc00/files/3cee5c94-f03d-40d4-9906-7db85c7ee2d8.jpg" 
                  alt="Викторина" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-purple via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <Icon name="Trophy" className="w-8 h-8 text-gold animate-pulse" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-cinzel font-bold text-gold mb-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Весёлая викторина и не только
                </h3>
                <p className="text-light-purple font-cormorant text-lg" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Проверь свои знания о волшебном мире и выиграй магические призы
                </p>
              </CardContent>
            </Card>
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

      {/* Moving Portraits Section */}
      <section className="relative py-16 px-4 bg-dark-purple/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-cinzel font-black text-gold text-center mb-12" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.3)' }}>
            Портретная галерея Хогвартса
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="moving-portrait bg-dark-purple/60 rounded-xl border-4 border-gold/40 p-4 overflow-hidden">
              <img 
                src="https://cdn.poehali.dev/projects/8fcac141-9992-4fa7-88d4-e8c8df86bc00/files/01500e9e-1522-45a7-b97c-a476088f32f8.jpg"
                alt="Волшебный портрет"
                className="w-full h-80 object-cover rounded-lg"
              />
              <p className="text-gold font-cinzel font-bold text-center mt-3">Профессор Альбус</p>
            </div>
            <div className="moving-portrait bg-dark-purple/60 rounded-xl border-4 border-gold/40 p-4 overflow-hidden">
              <img 
                src="https://cdn.poehali.dev/projects/8fcac141-9992-4fa7-88d4-e8c8df86bc00/files/20732063-5aad-4541-9bfe-f97c0752c87c.jpg"
                alt="Волшебный портрет"
                className="w-full h-80 object-cover rounded-lg"
              />
              <p className="text-gold font-cinzel font-bold text-center mt-3">Профессор Минерва</p>
            </div>
          </div>
        </div>
      </section>

      {/* Snitch Game Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-cinzel font-black text-gold mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.3)' }}>
            Поймай золотой снитч!
          </h2>
          {!showSnitchGame ? (
            <Button
              onClick={() => {
                setShowSnitchGame(true);
                setSnitchCaught(0);
              }}
              className="bg-gold/20 hover:bg-gold/40 border-2 border-gold text-gold font-cinzel font-bold text-xl px-8 py-6"
            >
              <Icon name="Circle" className="w-6 h-6 mr-2" />
              Начать игру
            </Button>
          ) : (
            <div className="relative bg-dark-purple/60 rounded-xl border-2 border-gold/50 p-8 min-h-[400px]">
              <div className="text-center mb-4">
                <p className="text-2xl text-gold font-cinzel font-bold">Поймано: {snitchCaught}</p>
                <Button
                  onClick={() => setShowSnitchGame(false)}
                  className="mt-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500"
                >
                  Закончить игру
                </Button>
              </div>
              <div
                onClick={catchSnitch}
                className="snitch-flying absolute w-12 h-12 cursor-pointer transition-all hover:scale-125"
                style={{ left: `${snitchPosition.x}%`, top: `${snitchPosition.y}%` }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gold rounded-full animate-pulse"></div>
                  <Icon name="Circle" className="w-12 h-12 text-gold relative z-10" />
                  <div className="absolute top-0 -left-2 w-6 h-2 bg-gold/50 rounded-full"></div>
                  <div className="absolute top-0 -right-2 w-6 h-2 bg-gold/50 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Spell Book Section */}
      <section className="relative py-16 px-4 bg-dark-purple/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-cinzel font-black text-gold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.3)' }}>
              Книга заклинаний
            </h2>
            <Button
              onClick={() => setShowSpellBook(!showSpellBook)}
              className="bg-gold/20 hover:bg-gold/40 border-2 border-gold text-gold font-cinzel font-bold"
            >
              <Icon name="Book" className="w-5 h-5 mr-2" />
              {showSpellBook ? 'Закрыть книгу' : 'Открыть книгу'}
            </Button>
          </div>
          
          {showSpellBook && (
            <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
              {[
                { spell: 'Люмос', desc: 'Зажигает свет на конце волшебной палочки', icon: 'Lightbulb' },
                { spell: 'Алохомора', desc: 'Открывает запертые двери и окна', icon: 'Key' },
                { spell: 'Экспекто Патронум', desc: 'Вызывает Патронуса для защиты', icon: 'Shield' },
                { spell: 'Вингардиум Левиоса', desc: 'Заставляет предметы левитировать', icon: 'MoveUp' },
                { spell: 'Экспеллиармус', desc: 'Обезоруживает противника', icon: 'Zap' },
                { spell: 'Репаро', desc: 'Чинит сломанные предметы', icon: 'Wrench' }
              ].map((item, idx) => (
                <Card key={idx} className="bg-secondary-purple/40 border-gold/30 hover:border-gold/60 transition-all hover-scale group">
                  <CardContent className="p-6 relative overflow-hidden">
                    <div className="patronus-effect absolute top-0 right-0 w-20 h-20">
                      <Icon name="Sparkles" className="w-full h-full text-blue-300/50" />
                    </div>
                    <div className="flex items-start gap-4">
                      <Icon name={item.icon as any} className="w-10 h-10 text-gold flex-shrink-0" />
                      <div>
                        <h3 className="text-2xl font-cinzel font-bold text-gold mb-2">{item.spell}</h3>
                        <p className="text-light-purple font-cormorant text-lg">{item.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Magic Rules Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-cinzel font-black text-gold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.3)' }}>
              Магические правила праздника
            </h2>
            <Button
              onClick={() => setShowMagicRules(!showMagicRules)}
              className="bg-gold/20 hover:bg-gold/40 border-2 border-gold text-gold font-cinzel font-bold"
            >
              <Icon name="ScrollText" className="w-5 h-5 mr-2" />
              {showMagicRules ? 'Свернуть свиток' : 'Развернуть свиток'}
            </Button>
          </div>

          {showMagicRules && (
            <Card className="bg-[#F4E8D0] border-4 border-[#8B7355] animate-fade-in">
              <CardContent className="p-8 space-y-4">
                {[
                  { rule: 'Дресс-код обязателен', desc: 'Приходите в образе своего любимого персонажа или в цветах факультета', icon: 'Users' },
                  { rule: 'Магглам вход воспрещён', desc: '...шутка! Все маглы приглашаются в волшебный мир', icon: 'Smile' },
                  { rule: 'Принеси хорошее настроение', desc: 'Это самое важное заклинание вечера!', icon: 'Heart' },
                  { rule: 'Запрещённые заклинания', desc: 'Непростительные заклинания оставьте дома... особенно Авада Кедавра', icon: 'Ban' },
                  { rule: 'Фотографируйтесь', desc: 'Запечатлейте магические моменты в фотозоне!', icon: 'Camera' },
                  { rule: 'Веселитесь от души', desc: 'Танцуйте, играйте и наслаждайтесь волшебством!', icon: 'Sparkles' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-white/30 rounded-lg">
                    <Icon name={item.icon as any} className="w-8 h-8 text-[#8B7355] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-cinzel font-bold text-[#2C1810] mb-1">{item.rule}</h3>
                      <p className="text-[#4A3728] font-cormorant text-lg">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Add to Calendar Button */}
      <section className="relative py-8 px-4">
        <div className="max-w-md mx-auto text-center">
          <Button
            onClick={addToCalendar}
            className="w-full bg-gold/20 hover:bg-gold/40 border-2 border-gold text-gold font-cinzel font-bold text-lg py-6"
          >
            <Icon name="Calendar" className="w-6 h-6 mr-2" />
            Добавить в календарь
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 text-center bg-black">
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

      {/* Voldemort Section - Dark Ending */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-black to-black">
        <div className="max-w-2xl mx-auto text-center">
          <div 
            onClick={() => {
              avadaSoundRef.current?.play();
              setTimeout(() => window.close(), 1000);
            }}
            className="cursor-pointer group transition-all hover-scale"
          >
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500/30 via-red-500/30 to-green-500/30 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity animate-pulse"></div>
              <div className="relative">
                <img 
                  src="https://cdn.poehali.dev/projects/8fcac141-9992-4fa7-88d4-e8c8df86bc00/files/2ac50b8e-2fac-4645-a069-ce06f1022f1e.jpg" 
                  alt="Волан-де-Морт" 
                  className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-red-900/50 group-hover:border-red-500 transition-all shadow-2xl"
                />
              </div>
              <div className="absolute -top-2 -right-2 group-hover:animate-spin">
                <Icon name="Skull" className="w-12 h-12 text-red-500 opacity-80" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-5xl md:text-6xl font-cinzel font-black text-red-500 group-hover:text-red-400 transition-colors animate-pulse" 
                  style={{ textShadow: '3px 3px 10px rgba(220,38,38,0.8), 0 0 30px rgba(34,197,94,0.5)' }}>
                АВАДА КЕДАВРА
              </h3>
              <p className="text-xl text-red-300/80 font-cormorant font-bold italic opacity-0 group-hover:opacity-100 transition-opacity">
                Кликни, чтобы закрыть портал...
              </p>
              <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="Zap" className="w-6 h-6 text-green-500 animate-pulse" />
                <Icon name="Zap" className="w-6 h-6 text-green-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <Icon name="Zap" className="w-6 h-6 text-green-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;