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
import API from "@/router/index";


export default function ArtisanaMaroc() {
  const router = useRouter();
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: products, isLoading, error } = API.public.useFirstCommunityProject("https://script.google.com/macros/s/AKfycbxG7nDHGnULFElnqgtSlnXu2uQO14NfhN_Rwkxp5Q6kNWowxO0YCcP0gOERMZgse74/exec");
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }


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
                  <Text weight={500}>{product.title}</Text>
                  <Badge color="red" variant="light">
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
                  color="red"
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.6,
      },
    },
  };

  const imageHoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  return (
    <section className="relative min-h-[85vh] bg-stone-50">
      {/* Left Side Content */}
      <motion.div
        className="absolute inset-0 grid w-full h-full grid-cols-1 lg:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Text Content - Left Side */}
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-24">
          <motion.div variants={itemVariants} className="space-y-6">
            <span className="px-4 py-2 text-sm font-medium text-red-600 rounded-full bg-red-50">
              Tapisserie au Design Élégant et Raffiné
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
              Découvrez Notre{" "}
              <span className="text-red-600">Collection Artisanale</span>
            </h1>

            <p className="max-w-xl text-lg text-gray-600">
              Explorez notre sélection unique de pièces artisanales marocaines,
              créées avec passion et savoir-faire traditionnel.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <motion.button
                onClick={handleScroll}
                className="px-8 py-4 text-white transition-all bg-red-600 rounded-lg hover:bg-red-700 active:scale-95"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Voir nos produits
              </motion.button>

              <motion.button
                className="px-8 py-4 transition-all border border-red-200 rounded-lg hover:bg-red-50 active:scale-95"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                En savoir plus
              </motion.button>
            </div>

          </motion.div>
        </div>

        {/* Image Grid - Right Side */}
        <motion.div
          variants={imageVariants}
          className="relative hidden w-full h-full lg:block"
        >
          <div className="absolute grid w-full h-full grid-cols-2 gap-4 p-8">
            <div className="space-y-4">
              <motion.div
                className="w-full h-[300px] rounded-2xl overflow-hidden"
                variants={imageHoverVariants}
                whileHover="hover"
              >
                <img
                  src="https://i.pinimg.com/736x/d6/4d/e4/d64de47a46fd8699d1103275b81a4a6c.jpg"
                  alt="Moroccan Craft 1"
                  className="object-cover w-full h-full"
                />
              </motion.div>
              <motion.div
                className="w-full h-[200px] rounded-2xl overflow-hidden"
                variants={imageHoverVariants}
                whileHover="hover"
              >
                <img
                  src="https://fr.bimago.media/media/catalog/image/view/product/161209/role/vis_image/size/750x1120/ad1073f52ffb301aab9a54f6d21dfad3.webp"
                  alt="Moroccan Craft 2"
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </div>
            <div className="mt-12 space-y-4">
              <motion.div
                className="w-full h-[200px] rounded-2xl overflow-hidden"
                variants={imageHoverVariants}
                whileHover="hover"
              >
                <img
                  src="https://fr.bimago.media/media/catalog/image/view/product/117969/role/vis_image/size/750x1120/0ffdf2f99c49c50146ad4fe8c12f37c3.webp"
                  alt="Moroccan Craft 3"
                  className="object-cover w-full h-full"
                />
              </motion.div>
              <motion.div
                className="w-full h-[300px] rounded-2xl overflow-hidden"
                variants={imageHoverVariants}
                whileHover="hover"
              >
                <img
                  src="https://fr.bimago.media/media/catalog/image/view/product/89138/role/vis_image/size/750x1120/699c82f8bf7035a39ef3906bc4f4ef30.webp"
                  alt="Moroccan Craft 4"
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
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
        <div className="flex flex-col items-center w-full md:w-[60%]">
          <img
            src={image}
            alt={title}
            className="rounded-lg h-[320px] w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-2 pt-2 sm:w-4/6 md:w-full">
          <Text weight={500} size="xl">
            {title}
          </Text>
          <Text>
            <div
              dangerouslySetInnerHTML={{ __html: shortDescription }}
              className="text-[16px] text-stone-800"
            />
          </Text>
          <Text weight={500} size="xl">
            <span className="font-bold text-red-700">Prix:</span> {price}
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
