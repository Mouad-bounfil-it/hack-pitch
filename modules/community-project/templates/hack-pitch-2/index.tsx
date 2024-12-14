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
    title: "<h3><strong>Trésors en Thuya</strong></h3>",
    category: "Artisanaux",
    price: "200 DH",
    image:
      "https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734165223175_WhatsAppImage2024-12-14at0917101.jpeg",
    shortDescription:
      "<h4> Découvrez l'élégance et l'authenticité de nos créations en bois de thuya, soigneusement façonnées par des artisans d'Essaouira.</h4>  ",
    richEditorContent:
      "<p> Plongez dans l'univers raffiné du bois de thuya, un matériau noble et emblématique de l'artisanat marocain. Nos créations, issues du savoir-faire ancestral des artisans d'Essaouira, incarnent l'alliance parfaite entre tradition et modernité. Chaque pièce est soigneusement travaillée pour révéler la beauté naturelle et la chaleur du bois de thuya, avec ses motifs uniques et son parfum envoûtant. Que ce soit pour embellir votre intérieur ou offrir un cadeau d'exception, nos produits en thuya sont bien plus que de simples objets : ils sont le reflet d'un patrimoine riche et authentique, conçu pour séduire les amateurs de qualité et d'artisanat d'exception.</p>",
    phone: "0629079044",
  },
  {
    id: 2,
    title: "<h2>Céramiques</h2>",
    category: "Artisanaux",
    price: "150 DH",
    image:
      "https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734165678804_WhatsAppImage2024-12-14at091709.jpeg",
    shortDescription:
      "<h4>Découvrez la beauté intemporelle de nos créations en céramique, fabriquées avec soin par des artisans passionnés d'Essaouira.</h4>",
    richEditorContent:
      "<p>Plongez dans l'univers riche et coloré de l'artisanat marocain avec nos créations uniques en céramique, fabriquées à la main dans les ateliers d'Essaouira. Chaque pièce raconte une histoire, avec des motifs soigneusement peints à la main qui reflètent la culture et les traditions de cette ville côtière emblématique. Nos céramiques allient esthétique et utilité : idéales pour sublimer votre intérieur ou pour offrir un cadeau authentique et raffiné. Que vous cherchiez des plats, des vases ou des objets décoratifs, nos produits incarnent l'élégance et le savoir-faire d'une tradition séculaire. Apportez une touche d'originalité et de chaleur marocaine à votre quotidien grâce à ces pièces d'exception.</p> ",
    phone: "0629079044",
  },
  {
    id: 3,
    title: "<h2>Sandales Artisanales</h2>",
    category: "Vêtements",
    price: "599 DH",
    image:
      "https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734166150406_WhatsAppImage2024-12-14at0917081.jpeg",
    shortDescription:
      "<h4> Adoptez l’élégance et le confort avec nos sandales artisanales d’Essaouira, conçues à partir de matériaux naturels et durables.</h4>",
    richEditorContent: `<p>Découvrez nos sandales artisanales d'Essaouira, une parfaite alliance entre authenticité, confort et élégance. Fabriquées à la main par des artisans locaux, elles reflètent un savoir-faire transmis de génération en génération. Chaque paire est confectionnée à partir de matériaux naturels soigneusement sélectionnés, comme le cuir souple et les fibres durables, pour offrir une qualité exceptionnelle et une longévité remarquable.

Ces sandales polyvalentes s’adaptent à toutes vos occasions, du quotidien décontracté aux soirées estivales, tout en apportant une touche unique à votre style. Inspirées par l’esprit libre et la douceur de vivre d’Essaouira, elles incarnent le charme intemporel de la culture marocaine. Offrez à vos pieds un confort inégalé et une expérience authentique avec des sandales qui racontent une histoire.</p>`,
    phone: "0629079044",
  },
  {
    id: 4,
    title: "<h2>L'Art de S'habiller</h2>",
    category: "Vêtements",
    price: "800 DH",
    image:
      "https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734166248775_WhatsAppImage2024-12-14at094516.jpeg",
    shortDescription:
      "<h4>Découvrez nos vêtements artisanaux d'Essaouira, où chaque pièce incarne le savoir-faire traditionnel marocain. Confectionnés à la main avec des matériaux naturels, ces vêtements allient confort, élégance et authenticité, pour un style unique inspiré de la richesse culturelle de la ville.</h4> ",
    richEditorContent:
      "<p> Plongez dans l’univers des vêtements artisanaux d’Essaouira, où chaque pièce est une œuvre d’art unique, confectionnée avec soin par des artisans locaux. Nos collections mettent en valeur des tissus naturels et des motifs inspirés des traditions marocaines, tout en apportant une touche contemporaine pour s’adapter aux tendances d’aujourd’hui. Chaque vêtement reflète le mariage entre confort et sophistication, offrant des tenues à la fois légères, élégantes et durables. Que ce soit pour des caftans, des tuniques ou des accessoires, nos créations célèbrent le savoir-faire ancestral tout en ajoutant une touche de modernité à votre garde-robe. Portez un morceau d’Essaouira et faites l’expérience d’un style authentique, empreint de culture et de charme intemporel.</p>",
    phone: "0629079044",
  },
  {
    id: 5,
    title: "<h2>Rafia Naturel</h2>",
    category: "Artisanaux",
    price: "250 DH",
    image:
      "https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734166536331_WhatsAppImage2024-12-14at0917082.jpeg",
    shortDescription:
      "<h4>Explorez l’univers du raffia, une matière noble et durable, au cœur de l’artisanat d’Essaouira.</h4>  ",
    richEditorContent:
      "<p>Plongez dans l'univers du raffia naturel, une matière traditionnelle et durable qui incarne l'authenticité d'Essaouira. Nos créations en raffia sont entièrement fabriquées à la main par des artisans locaux, qui perpétuent un savoir-faire ancestral, tout en y apportant une touche moderne. Chaque pièce, qu'il s'agisse de sacs, chapeaux ou paniers, est minutieusement tissée pour offrir une combinaison parfaite de légèreté et de résistance. Le raffia naturel, avec sa texture unique et sa couleur chaleureuse, apporte à vos accessoires une touche élégante et intemporelle. Que ce soit pour ajouter du charme à votre quotidien ou pour offrir un cadeau original, nos produits en raffia sont une véritable invitation à découvrir l’artisanat marocain sous son meilleur jour.</p>",
    phone: "0629079044",
  },
  {
    id: 5,
    title: "<h2>Tapis Traditionnels</h2>",
    category: "Artisanaux",
    price: "900 DH",
    image:
      "https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734166735444_WhatsAppImage2024-12-14at095801.jpeg",
    shortDescription:
      "<h4>Découvrez l'authenticité et la beauté des tapis faits main d'Essaouira, où chaque création reflète un savoir-faire ancestral</h4>  ",
    richEditorContent:
      "<p>Plongez dans l’univers des tapis traditionnels d’Essaouira, où chaque pièce est le fruit d’un savoir-faire ancestral. Tissés à la main par des artisans locaux, ces tapis racontent l’histoire et les traditions de la région, avec des motifs uniques et des couleurs qui capturent l’essence de la culture marocaine. Fabriqués à partir de matériaux naturels de haute qualité, nos tapis offrent une texture douce et chaleureuse, parfaite pour sublimer votre intérieur. Que vous choisissiez un modèle géométrique, un design floral ou un motif plus subtil, chaque tapis reflète la passion et l'attention aux détails de son créateur. Ces pièces intemporelles allient esthétique, confort et durabilité, et apportent une touche de tradition marocaine à votre maison.</p>",
    phone: "0629079044",
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
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-amber-50 to-blue-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat bg-center" />
      </div>

      <div className="container px-4 mx-auto">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
                Découvrez l'Art
                <span className="text-blue-600"> Traditionnel d'Essaouira</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Explorez notre collection unique d'artisanat authentique, où
                chaque pièce raconte une histoire de tradition et de
                savoir-faire ancestral.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={handleScroll}
                className="relative inline-flex items-center px-8 py-3 overflow-hidden text-white transition-all duration-300 bg-blue-600 rounded-full group hover:bg-blue-700"
              >
                <span className="relative z-10">Découvrir nos produits</span>
                <div className="absolute inset-0 transition-transform duration-300 origin-left transform scale-x-0 bg-blue-700 group-hover:scale-x-100" />
              </button>
            </motion.div>
          </div>

          {/* Right Content - Featured Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
              <img
                src="https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1734119658533_WhatsAppImage2024-12-13at204944.jpeg"
                alt="Artisanat Marocain"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
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
            className="text-xl font-semibold"
          />
          <Badge className="px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full">
            {product.category}
          </Badge>
        </div>

        <div
          className="mb-4 text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: product.shortDescription }}
        />

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            {product.price}
          </span>
          <button
            onClick={onClick}
            className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
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
      `Bonjour, je suis intéressé(e) par votre produit: ${product.title}`
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
            <Badge className="px-6 py-2 text-lg font-medium text-blue-800 bg-blue-100 rounded-full">
              {product.category}
            </Badge>
            <span className="text-3xl font-bold text-blue-600">
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
              className="relative px-8 py-4 overflow-hidden bg-blue-600 group rounded-xl"
            >
              <div className="absolute inset-0 transition-transform duration-300 origin-left transform scale-x-0 bg-blue-700 group-hover:scale-x-100" />
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
          <div className="p-6 border border-blue-100 bg-blue-50 rounded-xl">
            <div className="flex items-center gap-4 text-blue-800">
              <MdPhoneInTalk size={24} />
              <span className="text-lg font-medium">{product.phone}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
