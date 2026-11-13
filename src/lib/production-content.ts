import type { ComponentType } from "react";
import {
  CircuitBoard,
  Drill,
  Flame,
  Hammer,
  Layers3,
  Move3D,
  PaintBucket,
  Scissors,
  Zap,
} from "lucide-react";

/**
 * ÜRETİM SAYFASI İÇERİĞİ
 *
 * Görseller: /public/uretim klasörüne "<bolum-slug>-<sira>.jpg" adıyla eklenir.
 * Örnek: public/uretim/kalip-tasarim-ve-uretim-1.jpg
 *
 * Fotoğraflar yüklendikten sonra aşağıdaki productionPhotosAvailable değerini
 * true yapın. Değer false iken hiçbir görsel isteği yapılmaz, kartlarda yer
 * tutucu (placeholder) gösterilir. Tekil bir fotoğraf eksik olursa kart yine
 * otomatik olarak yer tutucuya döner.
 *
 * Not: Aşağıdaki teknik değerler ve hat tanımları örnektir; gerçek makine
 * parkuru bilgileriyle güncellenmelidir.
 */

export const productionPhotosAvailable = false;

export type ProductionIcon = ComponentType<{ className?: string }>;

export interface ProductionMachine {
  name: string;
  description: string;
  specs: string[];
  image: string;
  imageAlt: string;
}

export interface ProductionSection {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  icon: ProductionIcon;
  machines: ProductionMachine[];
}

export const productionSections: ProductionSection[] = [
  {
    slug: "kalip-tasarim-ve-uretim",
    index: "01",
    title: "Kalıp Tasarım ve Üretim",
    tagline: "Üretim zincirinin başladığı yer",
    description:
      "Bir ürünün seri üretime dönüşmesi kalıp ile başlar. Tasarım ekibimiz parça geometrisini, malzeme akışını ve çevrim süresini birlikte değerlendirerek kalıbı üretime hazır hâle getirir. Kalıp imalatının tamamı kendi atölyemizde tamamlanır; tasarım ile tezgâh arasındaki mesafe kısa, revizyon süreleri hızlıdır.",
    highlights: [
      "3D tasarım ve akış analizi",
      "Kendi atölyemizde kalıp imalatı",
      "Tersine mühendislik ve revizyon",
      "Deneme presiyle devreye alma",
    ],
    icon: Move3D,
    machines: [
      {
        name: "CAD / CAM Tasarım İstasyonları",
        description:
          "Parametrik katı modelleme, kalıp ayırım yüzeyleri ve işleme yolu hazırlığı tek bir dijital zincirde yürütülür. Tasarım–imalat arasındaki hata payı en aza iner, revizyonlar tezgâha doğrudan aktarılır.",
        specs: ["Katı modelleme", "Akış ve soğutma analizi", "CAM işleme yolu"],
        image: "/uretim/kalip-tasarim-ve-uretim-1.jpg",
        imageAlt: "CAD / CAM tasarım istasyonu",
      },
      {
        name: "CNC Kalıp İşleme Merkezi",
        description:
          "Kalıp gövdeleri, çekirdek ve yanak parçaları yüksek devirli işleme merkezlerinde talaş kaldırılarak üretilir. Yüzey kalitesi ve ölçü hassasiyeti, kalıbın ömrünü doğrudan belirler.",
        specs: ["3 eksen işleme", "Yüksek devirli mil", "Hassas tolerans"],
        image: "/uretim/kalip-tasarim-ve-uretim-2.jpg",
        imageAlt: "CNC kalıp işleme merkezi",
      },
      {
        name: "Dalma ve Tel Erozyon (EDM)",
        description:
          "Kesici takımın ulaşamadığı köşeler, ince cidarlar ve sertleştirilmiş çelikler erozyonla işlenir. Böylece ısıl işlem sonrasında da kalıp geometrisi korunur.",
        specs: ["Dalma erozyon", "Tel erozyon", "Sert malzeme işleme"],
        image: "/uretim/kalip-tasarim-ve-uretim-3.jpg",
        imageAlt: "Dalma ve tel erozyon tezgâhı",
      },
      {
        name: "Kalıp Montaj ve Deneme Presi",
        description:
          "İşlenen parçalar kalıp montaj tezgâhında birleştirilir, deneme presinde ilk numuneler alınır. Ölçüm raporu onaylandıktan sonra kalıp seri üretime devredilir.",
        specs: ["Montaj ve polisaj", "Numune çekimi", "Ölçüm onayı"],
        image: "/uretim/kalip-tasarim-ve-uretim-4.jpg",
        imageAlt: "Kalıp montaj tezgâhı ve deneme presi",
      },
    ],
  },
  {
    slug: "talasli-imalat",
    index: "02",
    title: "Talaşlı İmalat",
    tagline: "Teknik resimden hassas parçaya",
    description:
      "Kalıp parçaları, fikstür elemanları, miller, burçlar ve özel bağlantı elemanları CNC ve konvansiyonel tezgâhlarda işlenir. Tek parça acil ihtiyaçlar ile seri üretim aynı atölyede, teknik resme uygun toleranslarda karşılanır.",
    highlights: [
      "CNC tornalama",
      "Dik ve yatay frezeleme",
      "Taşlama ve alıştırma",
      "Tek parça ve seri üretim",
    ],
    icon: Drill,
    machines: [
      {
        name: "CNC Torna",
        description:
          "Miller, burçlar, bilezikler ve dişli boşlukları CNC tornalarda işlenir. Tekrar eden parçalarda ölçü kararlılığı korunur, operatör kaynaklı sapma azalır.",
        specs: ["Canlı takım", "Tek bağlama", "Hassas çap toleransı"],
        image: "/uretim/talasli-imalat-1.jpg",
        imageAlt: "CNC torna tezgâhı",
      },
      {
        name: "CNC Dik İşleme Merkezi",
        description:
          "Fikstür plakaları, gövde ve kapak parçaları çoklu delik ve cep işlemleriyle dik işleme merkezinde tamamlanır. Delik eksenleri tek bağlamada işlendiği için montajda alıştırma ihtiyacı azalır.",
        specs: ["Çoklu delik", "Cep ve kontur", "Takım magazini"],
        image: "/uretim/talasli-imalat-2.jpg",
        imageAlt: "CNC dik işleme merkezi",
      },
      {
        name: "Konvansiyonel Torna ve Freze",
        description:
          "Bakım–onarım parçaları ve tek parça ihtiyaçlar için konvansiyonel tezgâhlar devrede kalır. Programlama beklemeden, kısa sürede parça teslimi yapılır.",
        specs: ["Tek parça üretim", "Bakım parçası", "Hızlı müdahale"],
        image: "/uretim/talasli-imalat-3.jpg",
        imageAlt: "Konvansiyonel torna ve freze tezgâhı",
      },
      {
        name: "Yüzey Taşlama Tezgâhı",
        description:
          "Isıl işlem görmüş miller ve pimler taşlanarak son ölçüsüne getirilir. Yüzey pürüzlülüğü ve geometrik doğruluk, ölçüm cihazlarıyla kontrol edilir.",
        specs: ["Silindirik taşlama", "Düzlem taşlama", "Isıl işlem sonrası"],
        image: "/uretim/talasli-imalat-4.jpg",
        imageAlt: "Yüzey taşlama tezgâhı",
      },
    ],
  },
  {
    slug: "plastik-enjeksiyon-hatti",
    index: "03",
    title: "Plastik Enjeksiyon Hattı",
    tagline: "Kalıptan çıkan parçanın seri üretimi",
    description:
      "Hammadde kurutma, enjeksiyon, robotik parça alma, kalite kontrol ve paketleme adımları tek bir akışta yürür. PA, PP, ABS, PC ve PE gibi farklı malzemelerde, ürün boyutuna uygun tonajlarda seri üretim yapılır.",
    highlights: [
      "Farklı tonajlarda enjeksiyon",
      "Robotik parça alma",
      "Sıcak kanal uygulamaları",
      "Malzeme kurutma ve geri kazanım",
    ],
    icon: Layers3,
    machines: [
      {
        name: "Plastik Enjeksiyon Makineleri",
        description:
          "Teknik parçalardan büyük hacimli ürünlere kadar farklı tonajlardaki enjeksiyon makineleri devrede. Kalıp sıcaklığı, basınç ve çevrim süresi reçete olarak saklanır, üretim tekrarlanabilir kalır.",
        specs: ["Çok tonajlı parkur", "Sıcak kanal", "Reçeteli üretim"],
        image: "/uretim/plastik-enjeksiyon-hatti-1.jpg",
        imageAlt: "Plastik enjeksiyon makinesi",
      },
      {
        name: "Robotik Parça Alma Ünitesi",
        description:
          "Kalıptan çıkan parça robot kol ile alınır ve konveyöre aktarılır. Kalıp içinde bekleme süresi kısaldığı için çevrim süresi düşer, parça deformasyon riski azalır.",
        specs: ["Robot kol", "Konveyör aktarımı", "Çevrim optimizasyonu"],
        image: "/uretim/plastik-enjeksiyon-hatti-2.jpg",
        imageAlt: "Robotik parça alma ünitesi",
      },
      {
        name: "Kalıp Sıcaklık Kontrol Ünitesi",
        description:
          "Kalıp sıcaklığının kararlı tutulması çekme, çarpılma ve iç gerilme riskini azaltır. Ölçü kararlılığı üretim boyunca korunur, yüzey hataları en aza iner.",
        specs: ["Sıcaklık kontrolü", "Kararlı ölçü", "Yüzey kalitesi"],
        image: "/uretim/plastik-enjeksiyon-hatti-3.jpg",
        imageAlt: "Kalıp sıcaklık kontrol ünitesi",
      },
      {
        name: "Kırma ve Geri Kazanım Hattı",
        description:
          "Yolluk ve hurda parçalar kırılıp belirlenen oranda üretime geri kazandırılır. Hammadde kaybı azalır, atık yönetimi kayıt altında tutulur.",
        specs: ["Kırıcı ünite", "Oranlı karışım", "Hurda yönetimi"],
        image: "/uretim/plastik-enjeksiyon-hatti-4.jpg",
        imageAlt: "Kırma ve geri kazanım hattı",
      },
    ],
  },
  {
    slug: "eksantirik-pres-hatti",
    index: "04",
    title: "Eksantirik Pres Hattı",
    tagline: "Sac şekillendirmede yüksek tekrar sayısı",
    description:
      "Sac parçaların kesme, delme, bükme ve şekillendirme işlemleri eksantirik preslerde ve kesme hatlarında yapılır. Hat; kalıp değişimine uygun yapısıyla hem yüksek adetli seri üretime hem de çok çeşitli parça üretimine cevap verir.",
    highlights: [
      "Kesme ve delme",
      "Bükme ve şekillendirme",
      "Otomatik şerit besleme",
      "Giyotin sac kesme",
    ],
    icon: Hammer,
    machines: [
      {
        name: "Eksantirik Presler",
        description:
          "Kesme, delme ve bükme kalıpları eksantirik preslerde çalıştırılır. Yüksek vuruş sayısı sayesinde sac parçalarda kısa çevrimle seri üretim yapılır.",
        specs: ["Yüksek vuruş sayısı", "Kalıp bağlantı tablası", "Emniyet kafesi"],
        image: "/uretim/eksantirik-pres-hatti-1.jpg",
        imageAlt: "Eksantirik pres",
      },
      {
        name: "Otomatik Şerit Besleme Ünitesi",
        description:
          "Rulo sac; açıcı, düzleştirici ve servo besleyici ile hatta sabit adımla verilir. Adım hassasiyeti arttığı için fire oranı düşer, operatör müdahalesi azalır.",
        specs: ["Rulo açıcı", "Servo besleme", "Adım hassasiyeti"],
        image: "/uretim/eksantirik-pres-hatti-2.jpg",
        imageAlt: "Otomatik şerit besleme ünitesi",
      },
      {
        name: "Giyotin Sac Makası",
        description:
          "Sac levhaların ebatlama ve ön kesim işlemleri giyotin makasta yapılır. Pres hattına ölçülü ve düzgün kenarlı sac hazırlanır, kenar kalitesi korunur.",
        specs: ["Ebatlama", "Ön kesim", "Ölçü ayarı"],
        image: "/uretim/eksantirik-pres-hatti-3.jpg",
        imageAlt: "Giyotin sac makası",
      },
      {
        name: "Abkant Büküm Presi",
        description:
          "Pres hattından çıkan parçaların açılı bükümleri abkant preslerde tamamlanır. Büküm açısı ve kotları ilk numune üzerinde doğrulanır, ardından seri üretime geçilir.",
        specs: ["Açılı büküm", "Numune kontrolü", "Farklı sac kalınlıkları"],
        image: "/uretim/eksantirik-pres-hatti-4.jpg",
        imageAlt: "Abkant büküm presi",
      },
    ],
  },
  {
    slug: "lazer-teknolojileri",
    index: "05",
    title: "Lazer Teknolojileri",
    tagline: "Kalıpsız üretimde hız ve esneklik",
    description:
      "Fiber lazer kesim sistemleriyle sac, profil ve boru kesimleri kalıp gerektirmeden yapılır. Tasarım değişikliği kalıp beklemeden üretime alınır; ilk parça ile seri parça aynı toleransta çıkar. Kesim sonrası parçalar markalanarak izlenebilirlik sağlanır.",
    highlights: [
      "Fiber lazer kesim",
      "Kalıpsız esnek üretim",
      "Boru ve profil kesim",
      "Lazer markalama",
    ],
    icon: Zap,
    machines: [
      {
        name: "Fiber Lazer Kesim Makinesi",
        description:
          "Sac levhalar yüksek hızda ve dar kesim aralığında kesilir. Kesim kenarında talaş ve deformasyon oluşmaz; ince sacdan kalın plakaya kadar geniş bir aralıkta çalışılır.",
        specs: ["Otomatik odaklama", "Dar kesim aralığı", "Geniş kalınlık aralığı"],
        image: "/uretim/lazer-teknolojileri-1.jpg",
        imageAlt: "Fiber lazer kesim makinesi",
      },
      {
        name: "Otomatik Palet Değiştirici",
        description:
          "Kesimi tamamlanan tabla otomatik olarak boşaltılır, yerine yeni sac yüklenir. Makinenin bekleme süresi kısalır, hat boyunca kesintisiz akış sağlanır.",
        specs: ["Çift tabla", "Hızlı yükleme", "Kesintisiz akış"],
        image: "/uretim/lazer-teknolojileri-2.jpg",
        imageAlt: "Otomatik palet değiştirici",
      },
      {
        name: "Boru ve Profil Lazer Kesim",
        description:
          "Kare, dikdörtgen ve yuvarlak profiller döner eksenle kesilir. Konstrüksiyon parçalarında kesim sonrası ek işlem ihtiyacı azalır, birleşim boşlukları küçülür.",
        specs: ["Döner eksen", "Profil kesim", "Açılı kesim"],
        image: "/uretim/lazer-teknolojileri-3.jpg",
        imageAlt: "Boru ve profil lazer kesim makinesi",
      },
      {
        name: "Lazer Markalama Ünitesi",
        description:
          "Parça üzerine seri numarası, logo ve izlenebilirlik kodu işlenir. Temassız ve kalıcı markalama sayesinde parça yüzeyi bozulmadan kimliklendirme yapılır.",
        specs: ["Kalıcı markalama", "İzlenebilirlik", "Temassız işlem"],
        image: "/uretim/lazer-teknolojileri-4.jpg",
        imageAlt: "Lazer markalama ünitesi",
      },
    ],
  },
  {
    slug: "yuzey-islem-teknolojileri",
    index: "06",
    title: "Yüzey İşlem Teknolojileri",
    tagline: "Dayanıklılık ve son görünüm",
    description:
      "Metal parçaların korozyona karşı korunması ve istenen görünüme kavuşması; yüzey temizliği, ön işlem, kaplama, boya ve pişirme adımlarından oluşan hatta sağlanır. Hat boyunca film kalınlığı ve renk, numune ile kontrol edilir.",
    highlights: [
      "Kumlama ve ön işlem",
      "Elektrostatik toz boya",
      "Yaş boya ve astar",
      "Pişirme ve kurutma",
    ],
    icon: PaintBucket,
    machines: [
      {
        name: "Toz Boya Hattı",
        description:
          "Elektrostatik toz boya ile yüzeyde kalın, sert ve çizilmeye dayanıklı bir film oluşturulur. RAL skalasında renk seçimi yapılır, köşe ve kenar örtücülüğü yüksektir.",
        specs: ["Elektrostatik tabanca", "RAL renk seçimi", "Yüksek darbe dayanımı"],
        image: "/uretim/yuzey-islem-teknolojileri-1.jpg",
        imageAlt: "Toz boya hattı",
      },
      {
        name: "Yaş Boya ve Astar Kabini",
        description:
          "Ön işlem görmüş parçalar astar ve son kat ile boyanır. İstenen renk, parlaklık ve film kalınlığı numune üzerinde doğrulanarak seri üretime geçilir.",
        specs: ["Astar uygulaması", "Son kat", "Renk kontrolü"],
        image: "/uretim/yuzey-islem-teknolojileri-2.jpg",
        imageAlt: "Yaş boya ve astar kabini",
      },
      {
        name: "Kumlama Kabini",
        description:
          "Yüzeydeki oksit, çapak ve eski boya kalıntıları kumlama ile temizlenir. Temiz yüzey, boya ve kaplamanın tutunma performansını doğrudan artırır.",
        specs: ["Yüzey temizliği", "Çapak alma", "Tutunma artışı"],
        image: "/uretim/yuzey-islem-teknolojileri-3.jpg",
        imageAlt: "Kumlama kabini",
      },
      {
        name: "Pişirme ve Kurutma Fırını",
        description:
          "Boya ve kaplama sonrası parçalar kontrollü sıcaklıkta pişirilir. Film tam olarak sertleşir; servis ömrü uzar, renk ve parlaklık kalıcı hâle gelir.",
        specs: ["Kontrollü sıcaklık", "Film sertleşmesi", "Homojen kuruma"],
        image: "/uretim/yuzey-islem-teknolojileri-4.jpg",
        imageAlt: "Pişirme ve kurutma fırını",
      },
    ],
  },
  {
    slug: "kaynak-ve-fiksturlu-imalat",
    index: "07",
    title: "Kaynak ve Fikstürlü İmalat",
    tagline: "Konstrüksiyonda tekrarlanabilir birleştirme",
    description:
      "Şasi, gövde ve taşıyıcı konstrüksiyonlar fikstürlü kaynak tezgâhlarında birleştirilir. Fikstür; ölçüyü, açıyı ve delik eksenlerini sabitlediği için her parça aynı konumda çıkar, montajda alıştırma ihtiyacı kalmaz.",
    highlights: [
      "MIG/MAG ve TIG kaynak",
      "Fikstürlü birleştirme",
      "Nokta kaynak",
      "Kaynak sonrası ölçüm",
    ],
    icon: Flame,
    machines: [
      {
        name: "MIG/MAG Kaynak İstasyonları",
        description:
          "Sac ve profil konstrüksiyonların ana birleştirmeleri MIG/MAG yöntemiyle yapılır. Dikiş sürekliliği ve nüfuziyet, kaynak sonrası görsel ve ölçüsel kontrolden geçer.",
        specs: ["Yarı otomatik kaynak", "Sürekli dikiş", "Nüfuziyet kontrolü"],
        image: "/uretim/kaynak-ve-fiksturlu-imalat-1.jpg",
        imageAlt: "MIG/MAG kaynak istasyonu",
      },
      {
        name: "TIG Kaynak İstasyonu",
        description:
          "İnce cidarlı ve görünür yüzeyli parçalarda kontrollü ısı girişiyle hassas kaynak yapılır. Dikiş temiz çıkar, sonrasında taşlama ihtiyacı azalır.",
        specs: ["İnce cidar", "Kontrollü ısı girişi", "Temiz dikiş"],
        image: "/uretim/kaynak-ve-fiksturlu-imalat-2.jpg",
        imageAlt: "TIG kaynak istasyonu",
      },
      {
        name: "Fikstür ve Kaynak Tezgâhları",
        description:
          "Parçalar üretime özel fikstürlerde sabitlenerek kaynatılır. Açı, kot ve delik eksenleri her tekrarda aynı konumda tutulur; seri parçalarda ölçü sapması önlenir.",
        specs: ["Üretime özel fikstür", "Açı ve kot kontrolü", "Tekrarlanabilirlik"],
        image: "/uretim/kaynak-ve-fiksturlu-imalat-3.jpg",
        imageAlt: "Fikstürlü kaynak tezgâhı",
      },
      {
        name: "Nokta Kaynak ve Punta Birleştirme",
        description:
          "Sac parçaların hızlı ön birleştirmesi nokta kaynakla yapılır, ardından sürekli dikişe geçilir. Parça kaymadan sabitlendiği için montaj ölçüleri korunur.",
        specs: ["Nokta kaynak", "Ön birleştirme", "Hızlı montaj"],
        image: "/uretim/kaynak-ve-fiksturlu-imalat-4.jpg",
        imageAlt: "Nokta kaynak ve punta birleştirme",
      },
    ],
  },
  {
    slug: "montaj-ve-dikis-makinalari-hatlari",
    index: "08",
    title: "Montaj ve Dikiş Makinaları Hatları",
    tagline: "Parçadan ürüne: hat sonu",
    description:
      "Üretilen parçalar montaj hatlarında bir araya gelir; dikiş makinaları ve otomasyon ekipmanları aynı hat üzerinde monte edilir, test edilir ve sevkiyata hazırlanır. Her istasyonda ara kontrol yapılır, hat sonunda fonksiyon testi tekrarlanır.",
    highlights: [
      "Montaj konveyör hattı",
      "Dikiş makinası montajı",
      "Fonksiyon ve dikiş testi",
      "Paketleme ve sevkiyat",
    ],
    icon: Scissors,
    machines: [
      {
        name: "Montaj Konveyör Hattı",
        description:
          "Alt montaj ve ana montaj istasyonları konveyör hattı üzerinde sıralanır. Parça akışı kesintisiz ilerler, istasyon dengesi üretim hızına göre kurgulanır.",
        specs: ["İstasyon dengesi", "Konveyör akışı", "Hat sonu stok kontrolü"],
        image: "/uretim/montaj-ve-dikis-makinalari-hatlari-1.jpg",
        imageAlt: "Montaj konveyör hattı",
      },
      {
        name: "Dikiş Makinası Montaj İstasyonları",
        description:
          "Gövde, mekanizma ve elektronik gruplar istasyonlarda sırayla monte edilir. Her istasyonda ara kontrol yapılır; hatalı parça bir sonraki adıma geçmeden ayrılır.",
        specs: ["Alt montaj", "Ara kontrol", "Mekanizma ayarı"],
        image: "/uretim/montaj-ve-dikis-makinalari-hatlari-2.jpg",
        imageAlt: "Dikiş makinası montaj istasyonu",
      },
      {
        name: "Dikiş Test ve Ayar Ünitesi",
        description:
          "Monte edilen makinalar dikiş testine alınır. Dikiş boyu, iplik gerginliği ve hız ayarları numune kumaş üzerinde doğrulanır, ayar değerleri kayda geçirilir.",
        specs: ["Dikiş testi", "Hız ve gerginlik ayarı", "Numune kontrolü"],
        image: "/uretim/montaj-ve-dikis-makinalari-hatlari-3.jpg",
        imageAlt: "Dikiş test ve ayar ünitesi",
      },
      {
        name: "Paketleme ve Sevkiyat İstasyonu",
        description:
          "Hattan çıkan ürünler koruyucu ambalajla paketlenir, etiketlenir ve sevkiyata hazır hâle getirilir. Paket içeriği ve seri numarası sevkiyat kaydıyla eşleştirilir.",
        specs: ["Koruyucu ambalaj", "Etiketleme", "Sevkiyat hazırlığı"],
        image: "/uretim/montaj-ve-dikis-makinalari-hatlari-4.jpg",
        imageAlt: "Paketleme ve sevkiyat istasyonu",
      },
    ],
  },
  {
    slug: "otomasyon-makina-imalatlarimiz",
    index: "09",
    title: "Otomasyon Makina İmalatlarımız",
    tagline: "Müşteriye özel makine ve hat çözümleri",
    description:
      "Standart makinelerin yanı sıra müşteri süreçlerine özel otomasyon makine ve hatları tasarlayıp üretiyoruz. Proje; ihtiyaç analizinden tasarıma, imalattan devreye alma ve operatör eğitimine kadar tek elden yürütülür.",
    highlights: [
      "Özel amaçlı makine tasarımı",
      "PLC ve robot entegrasyonu",
      "Görüntü işleme ile kontrol",
      "Devreye alma ve eğitim",
    ],
    icon: CircuitBoard,
    machines: [
      {
        name: "Özel Amaçlı Montaj Makineleri",
        description:
          "Müşteri ürününe göre kurgulanan istasyonlarda parça besleme, montaj ve kontrol tek makinede toplanır. Hat içi kayıplar azalır, operatör sayısı düşer.",
        specs: ["Ürüne özel tasarım", "Modüler istasyon", "Tek operatör kullanımı"],
        image: "/uretim/otomasyon-makina-imalatlarimiz-1.jpg",
        imageAlt: "Özel amaçlı montaj makinesi",
      },
      {
        name: "Robotik Hücreler ve Gantry Sistemler",
        description:
          "Endüstriyel robot ve gantry eksenleriyle parça taşıma, yükleme ve paletleme otomatikleştirilir. Tekrarlayan işlerde çevrim süresi sabitlenir, iş güvenliği artar.",
        specs: ["Robot entegrasyonu", "Gantry eksen", "Paletleme"],
        image: "/uretim/otomasyon-makina-imalatlarimiz-2.jpg",
        imageAlt: "Robotik hücre ve gantry sistem",
      },
      {
        name: "PLC Kontrol Panoları",
        description:
          "Hattın hareket ve emniyet mantığı PLC panolarda kurgulanır. Reçete yönetimi ve operatör ekranlarıyla üretim parametreleri izlenir, arıza kayıtları saklanır.",
        specs: ["PLC yazılımı", "Reçete yönetimi", "Emniyet mantığı"],
        image: "/uretim/otomasyon-makina-imalatlarimiz-3.jpg",
        imageAlt: "PLC kontrol panosu",
      },
      {
        name: "Görüntü İşleme ve Test Üniteleri",
        description:
          "Kamera tabanlı kontrol sistemleri ölçü, yüzey ve montaj doğruluğunu hat üzerinde denetler. Hatalı parça otomatik olarak hattan ayrılır, sonuçlar kayıt altına alınır.",
        specs: ["Kamera kontrolü", "Ölçüm doğrulama", "Hatalı parça ayırma"],
        image: "/uretim/otomasyon-makina-imalatlarimiz-4.jpg",
        imageAlt: "Görüntü işleme ve test ünitesi",
      },
    ],
  },
];

export const productionStats = [
  { label: "Üretim başlığı", value: "9" },
  { label: "Makine ve hat", value: `${productionSections.reduce((total, section) => total + section.machines.length, 0)}` },
  { label: "Uçtan uca süreç", value: "Kalıp → Sevkiyat" },
];
