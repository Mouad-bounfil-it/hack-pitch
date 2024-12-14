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
    msg: "Créme d'argan et savon artisanal Pour hydraté la peau",
    title:
      "<h3><strong>Créme d'argan et savon artisanal Pour hydraté la peau</strong></h3>",
    category: "Artisanaux",
    price: "200 DH",
    image:
      "https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734170516021_WhatsAppImage2024-12-14at105544.jpeg",
    shortDescription:
      "<h4> Crème 💯 naturelle à la basé d’Argan et des ingredients naturelle</h4>  ",
    richEditorContent:
      "<p>Soulagement des brûlures légères et traitements des irritations cutanées   Une base de creme hydratante naturel comme du beurre de karite , coco ,Argan, vitamine E</p>",
    phone: "0642132436",
  },
  {
    id: 2,
    msg: "Créme mains à la roseHydratation parfaite",
    title: "<h2>Créme mains à la roseHydratation parfaite</h2>",
    category: "Artisanaux",
    price: "150 DH",
    image:
      "https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734170607634_WhatsAppImage2024-12-14at105544.jpeg",
    shortDescription: "<h4>Créme hydration à la base d Argan et rose</h4>",
    richEditorContent: `<p>Une crème à l'argan pour les mains est idéale pour hydrater, nourrir et protéger la peau. L'huile d'argan est riche en vitamines E, en acides gras et en antioxydants, ce qui en fait un ingrédient très apprécié pour les soins de la peau, en particulier pour les mains sèches ou abîmées.

Si vous cherchez une recommandation ou une recette maison, voici quelques idées : <br />

Crème maison à l'huile d'argan pour les mains</p> `,
    phone: "0642132436",
  },
  {
    id: 3,
    msg: "Argan extra vierges",
    title: "<h2>Argan extra vierges</h2>",
    category: "Cosmétiques",
    price: "599 DH",
    image:
      "https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734170652717_data.jpeg",
    shortDescription:
      "<h4> Huile d'argan extra vierge, un trésor de beauté pour votre peau et vos cheveux.</h4>",
    richEditorContent: `<p>L'huile d'argan extra vierge est un produit cosmétique exceptionnel, extrait des noix de l'arganier, un arbre endémique du Maroc. Connue pour ses propriétés hydratantes et nourrissantes, cette huile est riche en acides gras essentiels et en vitamine E, ce qui en fait un allié précieux pour la beauté.</p>
    <p>Utilisée depuis des siècles par les femmes berbères, l'huile d'argan est idéale pour hydrater la peau, réduire les signes de vieillissement et améliorer l'élasticité de la peau. Elle pénètre rapidement sans laisser de film gras, ce qui la rend parfaite pour une utilisation quotidienne.</p>
    <p>En plus de ses bienfaits pour la peau, l'huile d'argan est également un excellent soin capillaire. Elle aide à nourrir et à revitaliser les cheveux secs et abîmés, leur apportant brillance et douceur. Appliquez quelques gouttes sur les pointes de vos cheveux pour un effet nourrissant et protecteur.</p>
    <p>Que ce soit pour un soin de la peau ou des cheveux, l'huile d'argan extra vierge est un incontournable de votre routine de beauté, offrant une expérience luxueuse et naturelle.</p>`,
    phone: "0642132436",
  },
  {
    id: 4,
    msg: "L'Art de S'habiller",
    title: "<h2>L'Art de S'habiller</h2>",
    category: "Vêtements",
    price: "800 DH",
    image:
      "https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734170704447_data1.jpeg",
    shortDescription:
      "<h4>Découvrez nos vêtements artisanaux d'Essaouira, où chaque pièce incarne le savoir-faire traditionnel marocain.</h4>",
    richEditorContent: `<p>Plongez dans l'univers des vêtements artisanaux d'Essaouira, où chaque pièce est une œuvre d'art unique, confectionnée avec soin par des artisans locaux. Nos collections mettent en valeur des tissus naturels et des motifs inspirés des traditions marocaines, tout en apportant une touche contemporaine pour s'adapter aux tendances d'aujourd'hui.</p>
    <p>Chaque vêtement reflète le mariage entre confort et sophistication, offrant des tenues à la fois légères, élégantes et durables. Que ce soit pour des caftans, des tuniques ou des accessoires, nos créations célèbrent le savoir-faire ancestral tout en ajoutant une touche de modernité à votre garde-robe.</p>
    <p>Nos vêtements sont conçus pour s'adapter à toutes les occasions, que ce soit pour une sortie décontractée, une fête ou un événement spécial. En portant nos pièces, vous portez un morceau de l'héritage culturel marocain, tout en affichant un style unique et authentique.</p>
    <p>Découvrez l'art de s'habiller avec nos créations, qui allient tradition et modernité, et faites l'expérience d'un style intemporel, empreint de culture et de charme.</p>`,
    phone: "0642132436",
  },
  {
    id: 5,
    msg: "Huile de lavande et Savon artisanal",
    title: "<h2>Huile de lavande et Savon artisanal</h2>",
    category: "Artisanaux",
    price: "250 DH",
    image:
      "https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734170779905_data4.jpeg",
    shortDescription:
      "<h4>Explorez l'univers du raffia, une matière noble et durable, au cœur de l'artisanat d'Essaouira.</h4>  ",
    richEditorContent:
      "<p>Plongez dans l'univers du raffia naturel, une matière traditionnelle et durable qui incarne l'authenticité d'Essaouira. Nos créations en raffia sont entièrement fabriquées à la main par des artisans locaux, qui perpétuent un savoir-faire ancestral, tout en y apportant une touche moderne. Chaque pièce, qu'il s'agisse de sacs, chapeaux ou paniers, est minutieusement tissée pour offrir une combinaison parfaite de légèreté et de résistance. Le raffia naturel, avec sa texture unique et sa couleur chaleureuse, apporte à vos accessoires une touche élégante et intemporelle. Que ce soit pour ajouter du charme à votre quotidien ou pour offrir un cadeau original, nos produits en raffia sont une véritable invitation à découvrir l'artisanat marocain sous son meilleur jour.</p>",
    phone: "0642132436",
  },
  {
    id: 6,
    msg: "Huile D'Argan alimentaire",
    title: "<h2>Huile D'Argan alimentaire</h2>",
    category: "Artisanaux",
    price: "900 DH",
    image:
      "https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734170813958_data6.jpeg",
    shortDescription:
      "<h4>Découvrez l'authenticité et la richesse de l'huile d'argan alimentaire, un trésor culinaire du Maroc.</h4>",
    richEditorContent: `<p>L'huile d'argan alimentaire est un produit exceptionnel, extrait des noix de l'arganier, un arbre endémique du Maroc. Connue pour ses propriétés nutritives, cette huile est riche en acides gras essentiels, en antioxydants et en vitamine E, ce qui en fait un choix idéal pour une alimentation saine.</p>
    <p>Utilisée dans la cuisine marocaine traditionnelle, l'huile d'argan apporte une saveur unique et délicate à vos plats. Que ce soit pour assaisonner des salades, mariner des viandes ou ajouter une touche finale à vos plats, elle rehausse le goût tout en offrant des bienfaits pour la santé.</p>
    <p>En plus de ses qualités culinaires, l'huile d'argan alimentaire est également reconnue pour ses effets bénéfiques sur la santé. Elle aide à réduire le cholestérol, favorise la digestion et contribue à la santé de la peau et des cheveux lorsqu'elle est consommée régulièrement.</p>
    <p>Découvrez l'authenticité et la richesse de l'huile d'argan alimentaire, un trésor culinaire du Maroc qui allie goût et bien-être. Intégrez-la dans votre cuisine pour une expérience gastronomique unique et saine.</p>`,
    phone: "0642132436",
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
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => {
                  router.push(`?productId=${product.id}`);
                  setSelectedProduct(product);
                }}
              />
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
  return (
    <section className="relative min-h-[50vh] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-xl shadow-md">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/moroccan-pattern.svg')] bg-repeat-space" />
      </div>

      <div className="container relative px-4 py-20 mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mb-12 space-y-6"
          >
            <h1 className="text-5xl font-bold text-transparent md:text-7xl bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              Cosmétiques Naturels du Maroc
            </h1>
            <p className="text-xl text-gray-700 md:text-2xl">
              Découvrez nos produits de beauté authentiques, enrichis aux
              ingrédients naturels et aux secrets ancestraux marocains
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative z-10"
          >
            <button
              onClick={handleScroll}
              className="relative inline-flex items-center gap-2 px-8 py-4 text-lg font-medium text-white transition-all rounded-full group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              <span>Explorer nos produits</span>
              <HiOutlineCursorClick className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-xl hover:shadow-xl"
    >
      <div className="overflow-hidden h-[250px] w-full">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            dangerouslySetInnerHTML={{ __html: product.title }}
            className="text-xl font-semibold line-clamp-1"
          />
          <Badge
            color="orange"
            className="px-3 py-1 text-sm text-orange-800 bg-orange-100 rounded-full"
          >
            {product.category}
          </Badge>
        </div>

        <div
          className="mb-4 text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: product.shortDescription }}
        />

        <div className="flex items-center justify-between mb-1">
          <span className="text-2xl font-bold text-orange-600">
            {product.price}
          </span>
          <button
            onClick={onClick}
            className="px-4 py-2 text-white transition-colors bg-orange-600 rounded-lg hover:bg-orange-700"
          >
            Voir détails
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ProductDetails = ({ product }) => {
  const sendMessageWa = () => {
    const encodedMessage = encodeURIComponent(
      `Bonjour, je suis intéressé(e) par votre produit: ${product.msg}`
    );
    const phoneFormat = String(product.phone).slice(1);
    window.open(
      `https://wa.me/${phoneFormat}?text=${encodedMessage}`,
      "_blank"
    );
  };

  const callPhoneNumber = () => {
    window.open(`tel:${product.phone}`, "_blank");
  };

  return (
    <div className="p-4 overflow-y-auto md:p-8 bg-gradient-to-br from-white to-gray-50">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-5 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <div
            dangerouslySetInnerHTML={{ __html: product.title }}
            className="text-4xl font-bold text-gray-900"
          />
          <div className="flex items-center gap-4">
            <Badge color="orange" className="px-6 py-2 text-lg font-medium text-orange-800 bg-orange-100 rounded-full">
              {product.category}
            </Badge>
            <span className="text-3xl font-bold text-orange-600">
              {product.price}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid max-w-6xl gap-16 mx-auto lg:grid-cols-2">
        {/* Left Column - Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="relative overflow-hidden group rounded-2xl">
            <img
              src={product.image}
              alt={product.title}
              className="object-cover w-full transition-transform duration-500 h-[600px] group-hover:scale-110"
            />
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/40 to-transparent group-hover:opacity-100" />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={sendMessageWa}
              className="relative px-8 py-4 overflow-hidden bg-green-500 group rounded-xl"
            >
              <div className="absolute inset-0 transition-transform duration-300 origin-left transform scale-x-0 bg-green-600 group-hover:scale-x-100" />
              <div className="relative z-10 flex items-center justify-center gap-3 text-white">
                <FaWhatsapp size={24} className="shrink-0" />
                <span className="text-lg font-medium">WhatsApp</span>
              </div>
            </button>

            <button
              onClick={callPhoneNumber}
              className="relative px-8 py-4 overflow-hidden bg-orange-600 group rounded-xl"
            >
              <div className="absolute inset-0 transition-transform duration-300 origin-left transform scale-x-0 bg-orange-700 group-hover:scale-x-100" />
              <div className="relative z-10 flex items-center justify-center gap-3 text-white">
                <MdPhoneInTalk size={24} className="shrink-0" />
                <span className="text-lg font-medium">Appeler</span>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Right Column - Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10"
        >
          {/* Short Description */}
          <div className="p-8 bg-white shadow-lg rounded-2xl">
            <h3 className="mb-6 text-2xl font-semibold text-gray-900">
              Aperçu du produit
            </h3>
            <div
              dangerouslySetInnerHTML={{ __html: product.shortDescription }}
              className="prose prose-lg text-gray-600"
            />
          </div>

          {/* Detailed Description */}
          <div className="p-8 bg-white shadow-lg rounded-2xl">
            <h3 className="mb-6 text-2xl font-semibold text-gray-900">
              Description détaillée
            </h3>
            <div
              dangerouslySetInnerHTML={{ __html: product.richEditorContent }}
              className="prose prose-lg text-gray-600"
            />
          </div>

          {/* Contact Information */}
          <div className="p-6 border border-orange-100 bg-orange-50 rounded-xl">
            <div className="flex items-center gap-4 text-orange-800">
              <MdPhoneInTalk size={24} />
              <span className="text-lg font-medium">{product.phone}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
