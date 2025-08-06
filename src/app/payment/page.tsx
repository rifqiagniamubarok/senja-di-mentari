'use client';

import { Card, CardBody, CardHeader, Button, Chip } from '@heroui/react';
import { QrCodeIcon, HeartIcon, CreditCardIcon, ArrowLeftIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PaymentPage() {
  const router = useRouter();

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = '/qrcode.png';
    link.download = 'mentari-senja-qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-green-500 to-yellow-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Button variant="light" startContent={<ArrowLeftIcon className="w-5 h-5" />} className="text-white hover:bg-white/10 font-bold" onPress={() => router.back()}>
              BACK
            </Button>
            <h1
              className="text-2xl sm:text-3xl font-black text-yellow-300 text-center flex-1 drop-shadow-lg"
              style={{ textShadow: '2px 2px 0px #dc2626, -1px -1px 0px #dc2626, 1px -1px 0px #dc2626, -1px 1px 0px #dc2626' }}
            >
              PAYMENT & DONATION
            </h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Code Section */}
          <Card className="shadow-xl bg-white border-4 border-green-600">
            <CardHeader className="text-center pb-6 bg-gradient-to-r from-green-400 to-green-500">
              <div className="w-full">
                <div className="flex items-center justify-center mb-4">
                  <QrCodeIcon className="w-8 h-8 text-white mr-3" />
                  <h2 className="text-2xl font-black text-white drop-shadow-md">QRIS PAYMENT</h2>
                </div>
                <p className="text-white font-bold drop-shadow-sm">Scan the QR code below to make payment or donation</p>
              </div>
            </CardHeader>
            <CardBody className="flex flex-col items-center bg-green-50">
              {/* QR Code Display */}
              <div className="bg-white p-6 rounded-lg shadow-inner mb-6 border-4 border-yellow-400">
                <div className="w-80 h-80 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image src="/qrcode.png" alt="QRIS Payment QR Code for Senja di Mentari" width={300} height={300} className="object-contain" priority />
                </div>
              </div>

              {/* Business Info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-black text-red-700 mb-2">SENJA DI MENTARI</h3>
                <p className="text-green-800 text-sm font-bold">Coffee Shop</p>
                <Chip className="mt-2 bg-red-600 text-white font-bold" variant="flat">
                  NMID: ID1025421255700
                </Chip>
              </div>

              {/* Download Button */}
              <div className="mb-6">
                <Button
                  color="warning"
                  variant="flat"
                  startContent={<ArrowDownTrayIcon className="w-4 h-4" />}
                  onPress={downloadQRCode}
                  className="w-full bg-red-600 text-white hover:bg-red-500 font-bold border-2 border-yellow-400"
                >
                  DOWNLOAD QR CODE
                </Button>
              </div>

              {/* Instructions */}
              <div className="w-full bg-green-700 rounded-lg p-4 border-4 border-yellow-400">
                <h4 className="font-black text-yellow-300 mb-2 drop-shadow-sm">HOW TO PAY:</h4>
                <ol className="text-sm text-gray-300 space-y-1">
                  <li>1. Open your banking app or e-wallet</li>
                  <li>2. Select QRIS/QR Payment feature</li>
                  <li>3. Scan the QR code above</li>
                  <li>4. Enter the amount you wish to pay</li>
                  <li>5. Confirm your payment</li>
                </ol>
                <div className="mt-3 pt-3 border-t border-yellow-600">
                  <p className="text-xs text-gray-300">
                    💡 <strong>Tip:</strong> Download the QR code to save it on your device for offline payments
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Payment Options Section */}
          <div className="space-y-6">
            {/* Payment for Orders */}
            <Card className="shadow-lg bg-gray-900 border border-yellow-600">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <CreditCardIcon className="w-6 h-6 text-yellow-400 mr-3" />
                  <h3 className="text-xl font-semibold text-yellow-400">Payment for Orders</h3>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-gray-300 mb-4">Use this QR code to pay for your coffee orders. Perfect for both dine-in and takeaway orders.</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Accepted payments:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Chip size="sm" variant="flat" className="bg-black text-yellow-400">
                      Bank Transfer
                    </Chip>
                    <Chip size="sm" variant="flat" className="bg-green-100 text-green-800">
                      GoPay
                    </Chip>
                    <Chip size="sm" variant="flat" className="bg-purple-100 text-purple-800">
                      OVO
                    </Chip>
                    <Chip size="sm" variant="flat" className="bg-blue-100 text-blue-800">
                      DANA
                    </Chip>
                    <Chip size="sm" variant="flat" className="bg-orange-100 text-orange-800">
                      ShopeePay
                    </Chip>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Donation Section */}
            <Card className="shadow-lg border-2 border-yellow-600 bg-gradient-to-br from-gray-800 to-gray-900">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <HeartIcon className="w-6 h-6 text-yellow-400 mr-3" />
                  <h3 className="text-xl font-semibold text-yellow-400">Support & Donation</h3>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-gray-300 mb-4">
                  Love what we do? Support Senja di Mentari with a donation to help us continue serving quality coffee and creating a warm community space.
                </p>
                <div className="bg-gray-700 rounded-lg p-4 mb-4 border border-yellow-600">
                  <h4 className="font-medium text-yellow-400 mb-2">Your support helps us:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Source premium coffee beans directly from farmers</li>
                    <li>• Maintain equipment for quality brewing</li>
                    <li>• Create a welcoming space for the community</li>
                    <li>• Support local coffee farmers</li>
                  </ul>
                </div>
                <Button className="w-full bg-yellow-600 text-black hover:bg-yellow-500" startContent={<HeartIcon className="w-4 h-4" />}>
                  Make a Donation
                </Button>
              </CardBody>
            </Card>

            {/* Contact Info */}
            <Card className="shadow-lg bg-white border border-yellow-200">
              <CardBody>
                <h4 className="font-semibold text-gray-900 mb-3">Need Help?</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• For payment issues, please contact our staff</p>
                  <p>• Show payment confirmation for order verification</p>
                  <p>• Donations are processed securely through QRIS</p>
                  <p>• Download QR code for offline access</p>
                </div>
                <div className="mt-4 pt-4 border-t border-yellow-200">
                  <p className="text-xs text-gray-600 text-center">Powered by QRIS - Bank Indonesia's National QR Code Standard</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Bottom Notice */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-black to-yellow-900 rounded-lg shadow-xl p-6 max-w-2xl mx-auto border border-yellow-400">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Thank You for Choosing Senja di Mentari!</h3>
            <p className="text-yellow-200">
              Every payment and donation helps us continue our mission of bringing you exceptional coffee experiences from sunrise to sunset. We appreciate your support! ☕
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
