import {  Flex, HStack , chakra } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Logo from '@images/logo.svg';
import styles from "@scss/nav.module.scss";
import 'material-symbols';

const navLinks = [
  {
    label: "Props",
    icon: "details",
    href: "/props"
  },
  {
    label: "Profile",
    icon: "person",
    href: "/profile"
  },
  {
    label: "Button",
    icon: "push_pin",
    href: "/button"
  },
  {
    label: "Connect",
    icon: "connect_without_contact",
    href: "/connect"
  },
  {
    label: "404",
    icon: "cancel",
    href: "/missing"
  },
  {
    label: "Home",
    icon: "home",
    href: "/"
  }
];

export default function Navigation() {
  return (
    <chakra.header id="header" className={styles.navHeader}>
      <Flex
        align="center"
        justify={{ base: 'space-between', md: 'space-around' }}
      >
        <img src={Logo} className={styles.navLogo} alt="logo" />
        <HStack as="nav" spacing="5">
          {navLinks.map((item, i) => (
            <Link key={i} className={styles.navLink} to={item.href}>
              <i className="material-symbols-sharp">{item.icon}</i>
              <br />
              {item.label}
            </Link>
          ))}
        </HStack>
      </Flex>
    </chakra.header>
  );
};
