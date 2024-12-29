
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
})

function PdfMenu() {
  return (
    <Document pageMode='useOutlines'>
      <Page
        size='A4'
        style={{ flexDirection: 'column', backgroundColor: '#fff' }}
      >
        
        <View style={{}}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  )
}

export default PdfMenu
