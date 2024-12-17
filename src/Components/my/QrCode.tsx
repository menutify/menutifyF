// import { useDataGlobalContext } from '@/Context/GlobalContext'
import QRCodeStyling, { FileExtension } from 'qr-code-styling'
import { useEffect, useRef, useState } from 'react'
import algosvg from '@/assets/createMenu/food.svg'
function QrCode() {
//   const { restaurant } = useDataGlobalContext()

  const qrCode = new QRCodeStyling({
    width: 200,
    height: 200,
    image: algosvg,
    dotsOptions: {
      color: '#4267b2',
      type: 'rounded'
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 1
    }
  })

  const [fileExt, setFileExt] = useState('png')
  const ref = useRef(null)

  useEffect(() => {
    const current = ref.current
    if (current) {
      qrCode.append(current)
    }
  }, [])

  useEffect(() => {
    qrCode.update({
      data: 'www.youtube.com'
    })
  }, [])

  const onExtensionChange = (event) => {
    setFileExt(event.target.value)
  }

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt as FileExtension | undefined
    })
  }

  return (
    <div className='App'>
      <div style={styles.inputWrapper}>
        <select onChange={onExtensionChange} value={fileExt}>
          <option value='png'>PNG</option>
          <option value='jpeg'>JPEG</option>
          <option value='webp'>WEBP</option>
        </select>
        <button onClick={onDownloadClick}>Download</button>
      </div>
      <div ref={ref} />
    </div>
  )
}

export default QrCode
const styles = {
  inputWrapper: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  inputBox: {
    flexGrow: 1,
    marginRight: 20
  }
}
