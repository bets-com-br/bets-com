import AccountLayout from 'src/layouts/AccountLayout/AccountLayout'

const AccountPage: React.FC = () => {
  return (
    <div>
      <h1>AccountPage Component</h1>
    </div>
  )
}

;(AccountPage as any).Layout = AccountLayout

export default AccountPage
