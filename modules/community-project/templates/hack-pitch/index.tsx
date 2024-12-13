import { Container, Title, Text, SimpleGrid, Card, Image, Badge, Button, Group, Stack } from '@mantine/core';
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { HiOutlineCursorClick } from "react-icons/hi";
const products = [
  {
    id: 1,
    title: 'Tapis Berbère',
    category: 'Tapis',
    price: '2999 MAD',
    image: 'https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1729889014804_Oct25Screenshot.png',
    description: 'Tapis berbère fait à la main par des artisans de l\'Atlas',
  },
  {
    id: 2,
    title: 'Tajine en Céramique',
    category: 'Poterie',
    price: '399 MAD',
    image: 'https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1729889014804_Oct25Screenshot.png',
    description: 'Tajine traditionnel de Fès, peint à la main',
  },
  {
    id: 3,
    title: 'Lanterne Marocaine',
    category: 'Décoration',
    price: '599 MAD',
    image: 'https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/_files/file_1729889014804_Oct25Screenshot.png',
    description: 'Lanterne artisanale en métal et verre coloré',
  },
  // Add more products as needed
];

export default function ArtisanaMaroc() {
  return (
    <div>
      {/* Hero Section */}
     

      {/* Products Section */}
      <Container size="lg" py="xl">
        <Title order={2} mb="xl">Nos Produits</Title>
        <SimpleGrid 
          cols={3} 
          spacing="lg"
          breakpoints={[
            { maxWidth: 'md', cols: 2 },
            { maxWidth: 'sm', cols: 1 },
          ]}
        >
          {products.map((product) => (
            <Card 
              key={product.id} 
              shadow="sm"  
              radius="md" 
              withBorder
            >
              <Card.Section>
                <Image
                  src={product.image}
                  height={220}
                  alt={product.title}
                />
              </Card.Section>

              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{product.title}</Text>
                <Badge color="yellow" variant="light">
                  {product.category}
                </Badge>
              </Group>

              <Text size="sm" color="dimmed" mb="md">
                {product.description}
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
                Ajouter au panier
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* Footer */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '40px 0',
        marginTop: '60px'
      }}>
        <Container size="lg">
          <Text align="center" color="dimmed">
            © 2024 Artisana Maroc. Tous droits réservés.
          </Text>
        </Container>
      </div>
    </div>
  );
}




const Hero = ({ handleScroll, tabConfig }) => {
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
    <section className="container mx-auto">
      <motion.div
        className="relative overflow-hidden shadow-2xl rounded-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background Image with Softer Overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(${tabConfig?.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        <div className="relative flex flex-col items-center gap-12 px-6 py-12 md:px-12 lg:flex-row lg:py-20">
          <div className="w-full lg:w-1/2">
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center w-full mb-6 md:justify-start"
            >
              <span className="px-6 py-3 text-sm font-semibold text-black rounded-full bg-[#fff3e8] shadow-lg">
                🚀 Artisanat Traditionnel
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-3xl font-bold text-center text-white sm:text-4xl lg:text-6xl md:text-start"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
            >
              {tabConfig?.heroTitle}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-8 text-lg font-medium text-center text-gray-100 sm:text-xl md:text-start"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
            >
              {tabConfig?.heroContent}
            </motion.p>

            <motion.div
              className="z-10 mt-10 "
              // whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col items-center md:items-start">
                <div className="flex flex-col items-center justify-center">
                  <motion.div
                    onClick={handleScroll}
                    className="flex items-center gap-2 px-6 py-3 mb-4 bg-orange-500 border rounded-full cursor-pointer backdrop-blur-md border-white/20 hover:bg-orange-500/80"
                    // whileHover={{ y: -3 }}
                  >
                    <HiOutlineCursorClick className="w-5 h-5 text-white" />
                    <span className="text-sm font-medium tracking-wide text-white">
                      DÉCOUVRIR NOS PRODUITS
                    </span>
                  </motion.div>

                  <div className="relative cursor-pointer" onClick={handleScroll}>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white/20"
                      variants={pulseVariants}
                      initial="initial"
                      animate="animate"
                    />

                    <motion.div
                      className="flex flex-col gap-1"
                      variants={scrollIconVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <FaChevronDown className="w-5 h-5 text-white opacity-80" />
                      <FaChevronDown className="w-5 h-5 text-white opacity-40" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="hidden w-full lg:block lg:w-1/2" />
        </div>
      </motion.div>
    </section>
  );
};
