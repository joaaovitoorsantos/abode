import {
  Frame,
  Layout,
  LegacyCard,
  Navigation,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
  TopBar,
} from '@shopify/polaris'
import {
  ArrowLeftMinor,
  DeleteMajor,
  HomeMajor,
  OrdersMajor,
} from '@shopify/polaris-icons'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import Limpezas from './limpezas'

export default function Topbar() {
  const router = useRouter()
  const skipToContentRef = useRef<HTMLAnchorElement>(null)
  const [currentPage, setCurrentPage] = useState('home')
  const [isLoading, setIsLoading] = useState(false)
  const [userMenuActive, setUserMenuActive] = useState(false)
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false)
  const [userNome, setUserNome] = useState('Guest')

  useEffect(() => {
    // Obter o userId do localStorage
    const userId = localStorage.getItem('userId')

    // Se o userId estiver presente, faça uma consulta à sua tabela de moradores
    if (userId) {
      // Aqui você pode fazer uma chamada API para buscar o nome do usuário
      // usando a ID armazenada no localStorage
      // Este é um exemplo, ajuste a URL e os detalhes da solicitação para o seu backend
      axios
        .get(`/api/moradores/${userId}`)
        .then((response) => {
          const nome = response.data.nome
          setUserNome(nome) // Atualizar o estado com o nome do usuário
        })
        .catch((error) => {
          console.error('Erro ao buscar o nome do usuário:', error)
        })
    }
  }, [])

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  )
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive,
      ),
    [],
  )
  const toggleIsLoading = useCallback(
    () => setIsLoading((isLoading) => !isLoading),
    [],
  )

  const userMenuActions = [
    {
      items: [{ content: 'Meu perfil' }, { content: 'Configurações' }],
    },
  ]

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={userNome}
      detail={'Morador'}
      initials={userNome.charAt(0)}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  )

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  )

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: 'Sair',
            icon: ArrowLeftMinor,
          },
        ]}
      />
      <Navigation.Section
        separator
        title="Organizações"
        items={[
          {
            label: 'Home',
            icon: HomeMajor,
            onClick: () => setCurrentPage('home'),
          },
          {
            label: 'Limpeza',
            icon: DeleteMajor,
            onClick: () => setCurrentPage('limpeza'),
          },
          {
            label: 'Compras',
            icon: OrdersMajor,
            onClick: toggleIsLoading,
          },
          {
            label: 'Finanças',
            icon: OrdersMajor,
            onClick: toggleIsLoading,
          },
        ]}
      />
    </Navigation>
  )

  const actualPageMarkup = (() => {
    switch (currentPage) {
      case 'home':
        return <Page title="Home">Conteúdo da página inicial</Page>
      case 'limpeza':
        return <Limpezas />
      // Adicione mais cases conforme necessário
      default:
        return <Page title="Abode">Abode</Page>
    }
  })()

  const loadingPageMarkup = (
    <SkeletonPage>
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={9} />
            </TextContainer>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  )

  const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup

  const logo = {
    width: 50,
    topBarSource: 'https://i.imgur.com/seVohFD.png',
    url: '#',
    accessibilityLabel: 'Abode',
  }

  return (
    <>
      <Frame
        logo={logo}
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
        skipToContentTarget={skipToContentRef}
      >
        {pageMarkup}
      </Frame>
    </>
  )
}
