import {
  PDFViewer,
  Document,
  Image,
  Page,
  Text,
  View
} from '@react-pdf/renderer'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Categories, Menu, Restaurant } from '@/types'

function PdfPage() {
  const [menu, setMenu] = useState<Menu>()
  const [categories, setCategories] = useState<Categories>()
  const [restaurant, setRestaurant] = useState<Restaurant>()
  const [loading, setLoading] = useState(true)
  console.log('hola')
  const { domain } = useParams()

  useEffect(() => {
    const url = import.meta.env.VITE_APIPATH + '/api/app/' + domain

    setLoading(true)
    axios
      .get(url, {
        withCredentials: true
      })
      .then((res) => {
        const { data } = res.data
        const { categories: categoriesData, restaurant, ...alldata } = data
        setMenu({
          ...alldata,
          s_color: alldata.s_color === '' ? 'ff0000' : alldata.s_color
        })
        setCategories(categoriesData)
        setRestaurant(restaurant)
        console.log({ alldata })
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])
  return loading ? (
    <h1>LOADING</h1>
  ) : (
    <PDFViewer className='w-full h-full min-h-screen'>
      <Document>
        <Page size={'A4'} style={{ padding: '20 40' }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              src={
                restaurant?.logo_url ||
                'https://images.unsplash.com/photo-1726557116827-5f2a95d57cab?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              style={{ width: '100px', border: '2px' }}
            />
            <Text>{restaurant?.name}</Text>
          </View>
          <View style={{ marginBottom: '20px' }}>
            <Text>Menu Datos</Text>

            <Text>{JSON.stringify(menu)}</Text>
          </View>
          <View>
            <Text>Categorias y comidas Datos</Text>

            <Text>{JSON.stringify(categories)}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default PdfPage
