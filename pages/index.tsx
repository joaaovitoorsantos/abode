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
import { ArrowLeftMinor, HomeMajor, OrdersMajor } from '@shopify/polaris-icons'
import { useCallback, useRef, useState } from 'react'

export default function Topbar() {
  const skipToContentRef = useRef<HTMLAnchorElement>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [userMenuActive, setUserMenuActive] = useState(false)
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false)

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
      name="João Vitor"
      detail={'Morador'}
      initials="J"
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
            onClick: toggleIsLoading,
          },
          {
            label: 'Limpeza',
            icon: OrdersMajor,
            onClick: toggleIsLoading,
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

  const actualPageMarkup = <Page title="Abode">Abode</Page>

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
    <div style={{ height: '80px' }}>
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
    </div>
  )
}
