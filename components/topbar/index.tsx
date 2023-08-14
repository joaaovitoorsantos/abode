import {
  AppProvider,
  FormLayout,
  Frame,
  Layout,
  LegacyCard,
  Loading,
  Modal,
  Navigation,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
  TextField,
  TopBar,
} from '@shopify/polaris'
import {
  ArrowLeftMinor,
  ConversationMinor,
  HomeMajor,
  OrdersMajor,
} from '@shopify/polaris-icons'
import { useCallback, useRef, useState } from 'react'

export default function Topbar() {
  const skipToContentRef = useRef<HTMLAnchorElement>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [userMenuActive, setUserMenuActive] = useState(false)
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false)
  const [modalActive, setModalActive] = useState(false)

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
  const toggleModalActive = useCallback(
    () => setModalActive((modalActive) => !modalActive),
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
      name="Dharma"
      detail={'teste'}
      initials="D"
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
            label: 'Back to Shopify',
            icon: ArrowLeftMinor,
          },
        ]}
      />
      <Navigation.Section
        separator
        title="Jaded Pixel App"
        items={[
          {
            label: 'Dashboard',
            icon: HomeMajor,
            onClick: toggleIsLoading,
          },
          {
            label: 'Jaded Pixel Orders',
            icon: OrdersMajor,
            onClick: toggleIsLoading,
          },
        ]}
        action={{
          icon: ConversationMinor,
          accessibilityLabel: 'Contact support',
          onClick: toggleModalActive,
        }}
      />
    </Navigation>
  )

  const loadingMarkup = isLoading ? <Loading /> : null

  const skipToContentTarget = (
    <a id="SkipToContentTarget" ref={skipToContentRef} tabIndex={-1} />
  )

  const actualPageMarkup = (
    <Page title="Account">
      <Layout>
        {skipToContentTarget}
        <Layout.AnnotatedSection
          title="Account details"
          description="Jaded Pixel will use this as your account information."
        >
          <LegacyCard sectioned>
            <FormLayout></FormLayout>
          </LegacyCard>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  )

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
    width: 124,
    topBarSource:
      'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
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
