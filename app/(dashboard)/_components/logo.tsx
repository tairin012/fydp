import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/logo.png" alt="logo" height={500} width={500} className="h-16 w-16" />
      <span className="text-4xl font-bold text-gray-800">uiuX</span>
    </Link>
  )
}

export default Logo
