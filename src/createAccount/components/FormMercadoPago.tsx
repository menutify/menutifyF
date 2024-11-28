import {
  CardNumber,
  ExpirationDate,
  SecurityCode
} from '@mercadopago/sdk-react'

function FormMercadoPago() {
  return (
    <>
      <CardNumber
        placeholder='1234 5678 1234 4321'
        style={{
          paddingLeft: '11px',
          fontFamily: 'Helvetica Neue',
          fontSize: '15px',
          fontWeight: '300',
          placeholderColor: '#595A5B'
          // textAlign: 'center'
          // "font-variant": "common-ligatures"
        }}
        customFonts={[
          {
            src: 'https://fonts.cdnfonts.com/css/helvetica-neue-55?styles=30125,16015,16017,16008,16007,15981,15980,15991,15992'
          }
        ]}
      />
      <SecurityCode
        placeholder='123'
        style={{
          fontFamily: 'Helvetica Neue',
          fontSize: '14px',
          fontWeight: '300',
          placeholderColor: '#595A5B',
          paddingLeft: '11px'
          // "font-variant": "common-ligatures"
        }}
        customFonts={[
          {
            src: 'https://fonts.cdnfonts.com/css/helvetica-neue-55?styles=30125,16015,16017,16008,16007,15981,15980,15991,15992'
          }
        ]}
      />
      <ExpirationDate
        placeholder='01/26'
        mode='short'
        style={{
          fontFamily: 'Helvetica Neue',
          fontSize: '14px',
          fontWeight: '300',
          placeholderColor: '#595A5B',
          paddingLeft: '15px'
          // "font-variant": "common-ligatures"
        }}
        customFonts={[
          {
            src: 'https://fonts.cdnfonts.com/css/helvetica-neue-55?styles=30125,16015,16017,16008,16007,15981,15980,15991,15992'
          }
        ]}
      />
    </>
  )
}

export default FormMercadoPago
