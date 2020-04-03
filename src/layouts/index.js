import { ThemeContext, AuthorizationContext } from '@/components/CustomContexts'

function BasicLayout(props) {
  return (
    <div>
      <ThemeContext.Provider value={{ theme: 'light' }}>
        <AuthorizationContext.Provider value={{ isLogin: true }}>
          {props.children}
        </AuthorizationContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default BasicLayout;
