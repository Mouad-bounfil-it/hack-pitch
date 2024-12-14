import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Image,
  Badge,
  Button,
  Group,
} from "@mantine/core";
import { motion } from "framer-motion";

import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineCursorClick } from "react-icons/hi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Drawer, DrawerContent } from "@/components/drawer";
import { MdPhoneInTalk } from "react-icons/md";

const products = [
  {
    id: 1,
    title: "<h3><strong>Huile d’argan Alimentaire</strong></h3>",
    category: "Tapis",
    price: "800 DH",
    image:
      "https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734162194580_WhatsAppImage2024-12-14at0833542.jpeg",
    shortDescription:
      "<h4> L'Huile d'Argan Alimentaire pure et raffinée, idéale pour <br /> sublimer vos plats tout en offrant des bienfaits nutritionnels uniques <br /> grâce à sa richesse en antioxydants et vitamines.  <ul><li><p>&nbsp; Extrait des amandes d’arganier 100% naturel</p></li><li><p>&nbsp; 0% choléstérol</p></li><li><p> Riche en antioxydants et vitamines.</p></li><li><p> produit de terroir d’essaouira</p></li></ul>   Huile d’argan alimentaire BIO de 250ml, 500ml et 1L <br /> Bouteille verre ou en plastique selon le choix</h4>  ",
    richEditorContent:
      "<p> <strong>L'Huile d'Argan</strong> Alimentaire est un véritable trésor venu directement du Maroc. <br /> Extraite avec soin des noyaux d'arganier, cette huile pure et délicate est un allié précieux pour vos recettes. <br /> Elle est riche en acides gras essentiels, antioxydants et vitamine E, offrant ainsi des bienfaits exceptionnels à la fois pour votre santé et pour vos papilles. <br /> Son goût subtil, légèrement noisetté, sublimera vos salades, vos plats méditerranéens et vos sauces. <br /> Véritable perle de la nature, elle enrichit votre alimentation tout en apportant une touche luxueuse et raffinée à vos repas quotidiens.</p>",
    phone: "0707088515",
  },
  {
    id: 2,
    title: "<h2>Miel d’Argan</h2>",
    category: "Poterie",
    price: "399 DH",
    image:
      "https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734162111709_WhatsAppImage2024-12-14at0833541.jpeg",
    shortDescription:
      "<h4>Le Miel d’Argan, un délice pur et naturel, <br />aux arômes délicats et aux bienfaits multiples, <br />parfait pour vos préparations gourmandes ou pour une touche sucrée naturelle au quotidien.  <ul><li><p>·&nbsp;pur et naturel</p></li><li><p>·&nbsp;anti-biotique naturel</p></li><li><p>·&nbsp;source energétique journaliere</p></li><li><p>·&nbsp;produit de terroir d’essaouira</p></li></ul>   Disponible en pots 250g,500g et 1kg   </h4>",
    richEditorContent:
      "<p><strong>Le Miel d’Argan</strong> est une douceur exquise, capturée au cœur des plus belles fleurs. Avec son goût harmonieux et légèrement floral, il est un concentré de bienfaits naturels, combinant la douceur et l’intensité de plusieurs fleurs de saison. Ce miel pur et crémeux, riche en nutriments essentiels, regorge de propriétés apaisantes et revitalisantes. Il vous offre une expérience gustative exceptionnelle tout en soutenant votre bien-être quotidien. À la fois subtil et puissant, il est parfait pour    agrémenter vos boissons chaudes, vos desserts, ou pour simplement savourer une cuillère de pureté.</p> ",
    phone: "0707088515",
  },
  {
    id: 3,
    title: "<h2>Amlou d’Amande</h2>",
    category: "Décoration",
    price: "599 DH",
    image:
      "https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734162033728_WhatsAppImage2024-12-14at083354.jpeg",
    shortDescription:
      "<h4>  L'Amlou d'Amande, une fusion exquise d'amandes, <br />  d'huile d'argan et de miel multifloral, <br />  est une gourmandise 100% naturelle, pleine de saveurs et de bienfaits pour votre bien-être.  <ul><li><p>·&nbsp;100% naturel</p></li><li><p>·&nbsp; source de nutriments et d'énergie</p></li><li><p>·&nbsp;&nbsp;produit de terroir d’essaouira</p></li></ul>    Disponible en pots 250g,500g et 1kg <br /> Pot en verre ou en plastique selon le choix</h4>",
    richEditorContent:
      "<p> <strong>L'Amlou d’Amande</strong>, à base d'huile d'argan et de miel multifloral, <br /> est une pâte onctueuse et savoureuse qui incarne la tradition culinaire marocaine. <br /> Combinant l’onctuosité de l’amande, la richesse de l’huile d’argan et la douceur naturelle du miel multifloral, <br /> cette délicieuse préparation est une véritable explosion de saveurs et de bienfaits. <br /> Elle est non seulement un régal pour le palais, mais elle regorge aussi de vitamines et de nutriments qui nourrissent votre corps. <br /> Dégustez-la sur du pain frais, des crêpes ou même à la cuillère pour une expérience gourmande inoubliable, <br /> pleine de douceur et de vitalité.</p>",
    phone: "0707088515",
  },
  {
    id: 4,
    title: "<h2>Savons</h2>",
    category: "Décoration",
    price: "599 DH",
    image:
      "https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734161793018_WhatsAppImage2024-12-14at083353.jpeg",
    shortDescription:
      "<h4>Savon solide à base des huiles naturelles, <br /> nourrissant et hydratant, <br /> idéal pour les peaux sèches et sensibles, <br /> pour une peau douce et éclatante. <ul><li><p> 100% naturel</p></li><li><p> Hand made</p> </li><li><p> Effet goumage naturel</p></li></ul>  Savon solide de 100g en boite cartounée </h4> ",
    richEditorContent:
      "<p> <strong>Le savon solide</strong> à <strong>l’huile d'argan</strong> est un véritable soin nourrissant pour la peau. <br /> Riche en vitamine E et en acides gras essentiels, l'huile d'argan nourrit, hydrate et protège l’épiderme en profondeur. <br /> Ce savon, à la fois doux et réparateur, est idéal pour les peaux sèches ou sensibles. <br /> Grâce à ses propriétés antioxydantes, il aide à lutter contre les signes du vieillissement et redonne de l’éclat au teint. <br /> Sa mousse crémeuse et son parfum léger transforment chaque douche en un moment de bien-être et de luxe. <br /> Un soin quotidien parfait pour une peau douce et hydratée.</p>",
    phone: "0612345678",
  },
  {
    id: 5,
    title: "<h2>Soin capillaire</h2>",
    category: "Décoration",
    price: "599 DH",    
    image:
      "https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734161963289_WhatsAppImage2024-12-14at0833532.jpeg",
    shortDescription:
      "<h4> Soin complet à l'huile d'argan pour cheveux secs et abîmés : <br /> un shampoing nourrissant, <br />un après-shampoing démêlant et <br />un sérum réparateur, <br />pour des cheveux doux, brillants et protégés.  <ul><li><p>• 100% naturel</p></li><li><p>• Hydratation et réparation</p></li><li><p>• Pour des cheveux doux, lisses&nbsp;et&nbsp;éclatants</p></li></ul> </h4>  ",
    richEditorContent:
      "<p>Découvrez notre gamme de <strong>soins capillaires</strong> à base d'huile d'argan, un trio complet pour nourrir, réparer et sublimer vos cheveux. Le shampoing à l'huile d'argan nettoie en douceur tout en nourrissant et hydratant chaque fibre capillaire. Riche en vitamine E et en acides gras essentiels, il redonne éclat et douceur aux cheveux secs et abîmés. Suivi de l'après-shampoing à l'huile d'argan, qui démêle, hydrate en profondeur et protège contre les agressions extérieures, laissant les cheveux lisses et soyeux. Enfin, notre sérum capillaire à l'huile d'argan, concentré en huile pure, répare les pointes abîmées et contrôle les frisottis, offrant une brillance naturelle et un toucher soyeux. Ce soin complet est idéal pour les cheveux secs, fragiles ou abîmés, leur redonnant vitalité et éclat tout en les protégeant des dommages quotidiens.</p>",
    phone: "0612345678",
  },
  {
    id: 6,
    title: "<h2>Huile d'Argan Cosmétique</h2>",
    category: "Décoration",
    price: "599 DH",
    image:
      "https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1729889014804_Oct25Screenshot.png",
    shortDescription:
      "<h4> <strong>Huile d'argan cosmétique</strong> 100% naturelle, nourrissante et hydratante, idéale pour la peau et les cheveux, <br />pour un éclat naturel et une peau douce et revitalisée.  <ul> <li>100% naturelle</li> <li>Anti-âge et réparatrice</li> <li>Pour tous types de peau et cheveux</li></ul> </h4> ",
    richEditorContent:
      "<p> <strong>L'huile d'argan cosmétique</strong> est un véritable trésor pour la peau et les cheveux. <br /> Riche en vitamine E, en acides gras essentiels et en antioxydants, elle nourrit, hydrate et protège en profondeur. <br /> Utilisée pour le soin du visage, du corps et des cheveux, elle lutte contre les signes du vieillissement, répare les peaux sèches, et favorise la régénération cellulaire. <br /> Pour les cheveux, elle apporte brillance, douceur et protège contre les agressions extérieures. <br />Sa texture légère et non grasse permet une absorption rapide, laissant une sensation de confort sans résidu. <br /> Idéale pour tous les types de peau et de cheveux, cette huile 100% naturelle est votre alliée beauté au quotidien, <br /> pour une peau et des cheveux nourris, hydratés et éclatants de santé.</p>",
    phone: "0612345678",
  },
];

export default function ArtisanaMaroc() {
  const router = useRouter();
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const productId = router.query.productId;
    if (productId) {
      setIsProductSelected(true);
    }
  }, [router.query.productId]);

  const handleScroll = () => {
    const productsSection = document.querySelector("#products");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Drawer
        open={isProductSelected}
        onOpenChange={(open) => {
          if (open === false) {
            const { productId, ...filteredQuery } = router.query;

            router.push({ query: filteredQuery }, null, { shallow: true });
            setIsProductSelected(false);
          }
        }}
      >
        <DrawerContent>
          <ProductDetails product={selectedProduct} />
        </DrawerContent>
      </Drawer>
      <section className="mt-10">
        {/* Hero Section */}
        <Hero handleScroll={handleScroll} />

        {/* Products Section */}
        <Container size="lg" py="xl" id="products">
          <Title order={2} mb="xl">
            Nos Produits
          </Title>
          <SimpleGrid
            cols={3}
            spacing="lg"
            breakpoints={[
              { maxWidth: "md", cols: 2 },
              { maxWidth: "sm", cols: 1 },
            ]}
          >
            {products.map((product) => (
              <Card
                className="!shadow-md !cursor-pointer"
                key={product.id}
                radius="md"
                withBorder
                onClick={() => {
                  router.push(`?productId=${product.id}`);
                  setSelectedProduct(product);
                }}
              >
                <Card.Section>
                  <Image src={product.image} height={220} alt={product.title} />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.title,
                      }}
                    />
                  </Text>
                  <Badge color="yellow" variant="light">
                    {product.category}
                  </Badge>
                </Group>

                <Text size="sm" color="dimmed" mb="md">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.shortDescription,
                    }}
                    className="text-[16px] text-stone-800 line-clamp-3"
                  />
                </Text>

                <Text weight={500} size="xl" mb="md">
                  {product.price}
                </Text>

                <Button
                  variant="light"
                  color="yellow"
                  fullWidth
                  mt="md"
                  radius="md"
                >
                  Voir le produit
                </Button>
              </Card>
            ))}
          </SimpleGrid>
        </Container>

        {/* Footer */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "40px 0",
            marginTop: "60px",
          }}
        >
          <Container size="lg">
            <Text align="center" color="dimmed">
              © 2024 Artisana Maroc. Tous droits réservés.
            </Text>
          </Container>
        </div>
      </section>
    </>
  );
}

const Hero = ({ handleScroll }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const scrollIconVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.2, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="mx-auto">
      <motion.div
        className="relative overflow-hidden shadow-2xl rounded-2xl h-[500px] w-[90%] md:w-full mx-auto flex items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background Image with Softer Overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734119658533_WhatsAppImage2024-12-13at204944.jpeg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative flex flex-col items-center gap-12 px-6 py-12 md:px-12 lg:flex-row lg:py-20">
          <div className="flex flex-col items-center w-full lg:w-full">
            <motion.h1
              variants={itemVariants}
              className="mb-6 text-3xl font-bold text-center text-white sm:text-4xl lg:text-6xl md:text-start"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
            >
              Artisanat Traditionnel
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-8 text-lg font-medium text-center text-gray-100 sm:text-xl md:text-start"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
            >
              {/* Replace with your desired content */}
              "Découvrez notre sélection unique d'artisanat marocain."
            </motion.p>

            <motion.div
              className="z-10 mt-10 "
              // whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col items-center md:items-start">
                <div className="flex flex-col items-center justify-center">
                  <motion.div
                    onClick={handleScroll}
                    className="flex items-center gap-2 px-6 py-3 mb-4 bg-yellow-500 border rounded-full cursor-pointer backdrop-blur-md border-white/20 hover:bg-yellow-500/80"
                    // whileHover={{ y: -3 }}
                  >
                    <HiOutlineCursorClick className="w-5 h-5 text-white" />
                    <span className="text-sm font-medium tracking-wide text-white">
                      DÉCOUVRIR NOS PRODUITS
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

function ProductDetails({ product }: { product: any }) {
  const {
    title,
    category,
    price,
    image,
    shortDescription,
    richEditorContent,
    phone,
  } = product;

  const sendMessageWa = () => {
    const encodedMessage = encodeURIComponent(
      `slm bari nchri mn 3andak had l produit: ${title}`
    );
    const phoneNumber = phone;
    const phoneFormat = String(phoneNumber).slice(1);

    const whatsappLink = `https://wa.me/${phoneFormat}?text=${encodedMessage}`;

    window.open(whatsappLink, "_blank");
  };

  const callPhoneNumber = () => {
    const phoneNumber = phone;
    const telLink = `tel:${phoneNumber}`;
    window.open(telLink, "_blank");
  };

  return (
    <div className="flex flex-col gap-6 mx-auto overflow-y-auto w-[90%] md:max-w-5xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-start justify-center gap-4 md:flex-row"
      >
        <div className="flex flex-col items-center sm:w-2/6 md:w-full">
          <img
            src={image}
            alt={title}
            className="rounded-lg h-[320px] w-full"
          />
        </div>

        <div className="flex flex-col gap-2 pt-2 sm:w-4/6 md:w-full">
          <Text weight={500} size="xl">
            <div
              dangerouslySetInnerHTML={{ __html: title }}
              className="text-[16px] text-stone-800"
            />
          </Text>
          <Text>
            <div
              dangerouslySetInnerHTML={{ __html: shortDescription }}
              className="text-[16px] text-stone-800"
            />
          </Text>
          <Text weight={500} size="xl">
            <span className="font-bold text-yellow-700">Prix:</span> {price}
          </Text>

          <div className="flex items-center gap-2">
            <a
              onClick={sendMessageWa}
              className="p-2 text-white bg-green-500 rounded-full"
            >
              <FaWhatsapp size={30} className="shrink-0" />
            </a>
            <a
              onClick={callPhoneNumber}
              className="p-2 text-white border rounded-full bg-slate-700"
            >
              <MdPhoneInTalk size={30} className="shrink-0" />
            </a>
          </div>
        </div>
      </motion.div>
      <div>
        <Text size="md" color="dimmed">
          <div
            dangerouslySetInnerHTML={{ __html: richEditorContent }}
            className="text-[16px] text-stone-800"
          />
        </Text>
      </div>
    </div>
  );
}
