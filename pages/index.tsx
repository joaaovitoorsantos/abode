import axios from 'axios'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'

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
  ChecklistMajor,
  HomeMajor,
  SettingsMinor,
  CartMajor,
  CashDollarMinor,
} from '@shopify/polaris-icons'

import Limpezas from './limpezas'

export default function Topbar() {
  const router = useRouter()
  const skipToContentRef = useRef<HTMLAnchorElement>(null)
  const [currentPage, setCurrentPage] = useState('home')
  const [isLoading, setIsLoading] = useState(false)
  const [userMenuActive, setUserMenuActive] = useState(false)
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false)
  const [userNome, setUserNome] = useState('Guest')
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      axios
        .get(`/api/moradores/${userId}`)
        .then((response) => {
          const { nome, avatar } = response.data

          setUserNome(nome)
          setAvatar(avatar)
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
      items: [
        { content: 'Meu perfil' },
        { content: 'Minhas tarefas' },
        { content: 'Minhas Contribuições' },
      ],
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
      avatar={avatar && avatar}
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
            onClick: () => router.push('/login'),
          },
        ]}
      />
      <Navigation.Section
        separator
        title="Abode | Gestão da Casa"
        items={[
          {
            label: 'Home',
            icon: HomeMajor,
            onClick: () => setCurrentPage('home'),
          },
          {
            label: 'Tarefas',
            icon: ChecklistMajor,
            onClick: () => setCurrentPage('limpeza'),
          },
          {
            label: 'Compras',
            icon: CartMajor,
            onClick: toggleIsLoading,
          },
          {
            label: 'Economias',
            icon: CashDollarMinor,
            onClick: toggleIsLoading,
          },
          {
            label: 'Configurações',
            icon: SettingsMinor,
            onClick: toggleIsLoading,
          },
        ]}
      />
    </Navigation>
  )

  const actualPageMarkup = (() => {
    switch (currentPage) {
      case 'home':
        return <Page title="Home">Conteúdo da página inicial...</Page>
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
