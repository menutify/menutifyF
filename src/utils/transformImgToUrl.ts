export default function transformImgToUrl(file) {
  let imgurl
  if (file) {
    console.log('entre')
    const reader = new FileReader()
    reader.onload = (e) => {
      console.log(e.target?.result)
      imgurl = e.target?.result
      return e.target?.result
    }
    reader.readAsDataURL(file)
    return imgurl
  }
  return ''
}
