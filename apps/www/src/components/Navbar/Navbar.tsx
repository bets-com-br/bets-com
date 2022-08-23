import Container from 'src/components/Container/Container'
import Logo from 'src/components/Logo/Logo'
import NavLink, { INavLinkProps } from '../NavLink/NavLink'
import SportCategoriesMobile from '../SportCategoriesMobile/SportCategoriesMobile'
import styles from './Navbar.module.css'

const navLinks: INavLinkProps[] = [
  {
    label: 'Cadastre-se',
    href: {
      //pathname: '/api/auth/sign',
      pathname: 'https://cadastro.bets.com.br/novo/',
    },
  },
  {
    label: 'Login',
    href: {
      //pathname: '/api/auth/sign',
      pathname: 'https://pro.bets.com.br/',
    },
  },
  {
    label: 'Noticias',
    href: {
      pathname: '/artigos',
    },
  },
]

const Navbar: React.FC = () => {
  return (
    <nav className={styles.base}>
      <Container className={styles.container}>
        <div className="flex-1 grid grid-cols-3 items-center h">
          <div className="hidden lg:flex items-center gap-8">
            {navLinks?.map((link, index) => (
              <NavLink {...link} key={index} />
            ))}
          </div>

          <div className="flex w-max lg:w-full justify-center">
            <Logo />
          </div>

          <div className="flex justify-end">{/* <SearchForm /> */}</div>
        </div>

        <SportCategoriesMobile />
        {/* <MobileSearch /> */}
      </Container>
    </nav>
  )
}

export default Navbar
