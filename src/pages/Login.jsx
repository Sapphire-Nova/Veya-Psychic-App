import React, { useEffect } from 'react';
import { Authenticator, useAuthenticator, View, Image, Text, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === 'authenticated') {
      navigate('/Sanctuary');
    }
  }, [authStatus, navigate]);

  const components = {
    Header() {
      return (
        <View textAlign="center" padding="large">
          <Heading level={3} style={{ color: '#FFD700', fontFamily: 'serif' }}>
            Welcome to the Sanctuary
          </Heading>
        </View>
      );
    },
    Footer() {
      return (
        <View textAlign="center" padding="medium">
          <Text style={{ color: '#888', fontSize: '0.8rem' }}>
            © 2026 VIOLET FLAME HOLISTICS, LLC
          </Text>
        </View>
      );
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#0f172a', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      paddingBottom: '100px' 
    }}>
      <style>{
        [data-amplify-authenticator] {
          --amplify-colors-background-primary: #1e1b4b;
          --amplify-colors-brand-primary-80: #FFD700;
          --amplify-colors-brand-primary-90: #FFD700;
          --amplify-colors-brand-primary-100: #FFD700;
          --amplify-colors-text-primary: #ffffff;
          --amplify-radii-medium: 20px;
        }
      }</style>
      <Authenticator components={components} socialProviders={['google', 'apple']}>
        {({ signOut, user }) => (
          <div style={{ textAlign: 'center', color: 'white' }}>
            <h2 style={{ color: '#FFD700' }}>Blessed be, {user.username}</h2>
            <button onClick={() => navigate('/Sanctuary')} style={{ padding: '10px 20px', backgroundColor: '#FFD700', border: 'none', borderRadius: '10px', margin: '10px' }}>Enter Sanctuary</button>
            <button onClick={signOut} style={{ background: 'none', color: '#888', border: 'none', textDecoration: 'underline' }}>Sign Out</button>
          </div>
        )}
      </Authenticator>
    </div>
  );
};

export default Login;
