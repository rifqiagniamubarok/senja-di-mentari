'use client';

import { Card, CardBody, CardHeader, Button, Chip, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@heroui/react';
import { QrCodeIcon, HeartIcon, CreditCardIcon, ArrowLeftIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PaymentPage() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = '/qrcode.png';
    link.download = 'mentari-senja-qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white border-16 border-green-600" style={{ borderWidth: '16px' }}>
      {/* Header */}
      <div className="bg-white border-b-8 border-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="light"
              startContent={<ArrowLeftIcon className="w-5 h-5" />}
              className="text-green-800 hover:bg-green-100 font-bold border-2 border-green-600"
              onPress={() => router.back()}
            >
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
              <div
                className="bg-white p-6 rounded-lg shadow-inner mb-6 border-4 border-yellow-400 cursor-pointer hover:border-red-500 transition-colors duration-300"
                onClick={onOpen}
              >
                <div className="w-80 h-80 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image src="/qrcode.png" alt="QRIS Payment QR Code for Senja di Mentari" width={300} height={300} className="object-contain" priority />
                </div>
                <p className="text-center text-green-800 font-bold mt-2 text-sm">Click to enlarge</p>
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
            <Card className="shadow-lg bg-white border-4 border-green-600">
              <CardHeader className="pb-3 bg-gradient-to-r from-green-400 to-green-500">
                <div className="flex items-center">
                  <CreditCardIcon className="w-6 h-6 text-white mr-3" />
                  <h3 className="text-xl font-black text-white drop-shadow-md">PAYMENT FOR ORDERS</h3>
                </div>
              </CardHeader>
              <CardBody className="bg-green-50">
                <p className="text-green-800 font-bold mb-4">Use this QR code to pay for your coffee orders. Perfect for both dine-in and takeaway orders.</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-800 font-bold">Accepted payments:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Chip size="sm" variant="flat" className="bg-red-600 text-white font-bold">
                      Bank Transfer
                    </Chip>
                    <Chip size="sm" variant="flat" className="bg-green-600 text-white font-bold">
                      GoPay
                    </Chip>
                    <Chip size="sm" variant="flat" className="bg-yellow-500 text-black font-bold">
                      OVO
                    </Chip>
                    <Chip size="sm" variant="flat" className="bg-red-500 text-white font-bold">
                      DANA
                    </Chip>
                    <Chip size="sm" variant="flat" className="bg-green-500 text-white font-bold">
                      ShopeePay
                    </Chip>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Donation Section */}
            <Card className="shadow-lg border-4 border-yellow-400 bg-white">
              <CardHeader className="pb-3 bg-gradient-to-r from-yellow-400 to-yellow-500">
                <div className="flex items-center">
                  <HeartIcon className="w-6 h-6 text-red-700 mr-3" />
                  <h3 className="text-xl font-black text-red-700 drop-shadow-sm">SUPPORT & DONATION</h3>
                </div>
              </CardHeader>
              <CardBody className="bg-green-50">
                <p className="text-green-800 font-bold mb-4">
                  Love what we do? Support Senja di Mentari with a donation to help us continue serving quality coffee and creating a warm community space.
                </p>
                <div className="bg-green-600 rounded-lg p-4 mb-4 border-4 border-yellow-400">
                  <h4 className="font-black text-yellow-300 mb-2 drop-shadow-sm">YOUR SUPPORT HELPS US:</h4>
                  <ul className="text-sm text-white font-semibold space-y-1">
                    <li>• Source premium coffee beans directly from farmers</li>
                    <li>• Maintain equipment for quality brewing</li>
                    <li>• Create a welcoming space for the community</li>
                    <li>• Support local coffee farmers</li>
                  </ul>
                </div>
                <Button className="w-full bg-red-600 text-white hover:bg-red-500 font-black border-2 border-yellow-400" startContent={<HeartIcon className="w-4 h-4" />}>
                  MAKE A DONATION
                </Button>
              </CardBody>
            </Card>

            {/* Contact Info */}
            <Card className="shadow-lg bg-white border-4 border-red-600">
              <CardHeader className="bg-gradient-to-r from-red-500 to-red-600">
                <h4 className="font-black text-white drop-shadow-md">NEED HELP?</h4>
              </CardHeader>
              <CardBody className="bg-green-50">
                <div className="space-y-2 text-sm text-green-800 font-bold">
                  <p>• For payment issues, please contact our staff</p>
                  <p>• Show payment confirmation for order verification</p>
                  <p>• Donations are processed securely through QRIS</p>
                  <p>• Download QR code for offline access</p>
                </div>
                <div className="mt-4 pt-4 border-t-4 border-yellow-400">
                  <p className="text-xs text-red-700 text-center font-bold">Powered by QRIS - Bank Indonesia's National QR Code Standard</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Bottom Notice */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl mx-auto border-8 border-green-600">
            <h3
              className="text-lg font-black text-yellow-300 mb-2 drop-shadow-md"
              style={{ textShadow: '2px 2px 0px #dc2626, -1px -1px 0px #dc2626, 1px -1px 0px #dc2626, -1px 1px 0px #dc2626' }}
            >
              THANK YOU FOR CHOOSING SENJA DI MENTARI!
            </h3>
            <p className="text-green-800 font-bold drop-shadow-sm">
              Every payment and donation helps us continue our mission of bringing you exceptional coffee experiences from sunrise to sunset. We appreciate your support! ☕
            </p>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        classNames={{
          body: 'py-6',
          backdrop: 'bg-black/50 backdrop-opacity-40',
          base: 'border-4 border-green-600 bg-white',
          header: 'border-b-[1px] border-green-200',
          footer: 'border-t-[1px] border-green-200',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-gradient-to-r from-green-400 to-green-500">
                <div className="flex items-center justify-center">
                  <QrCodeIcon className="w-8 h-8 text-white mr-3" />
                  <h2 className="text-2xl font-black text-white drop-shadow-md">QRIS PAYMENT CODE</h2>
                </div>
              </ModalHeader>
              <ModalBody className="flex items-center justify-center bg-green-50">
                <div className="text-center">
                  <div className="bg-white p-8 rounded-lg shadow-inner border-4 border-yellow-400 mb-6">
                    <Image src="/qrcode.png" alt="QRIS Payment QR Code for Senja di Mentari" width={400} height={400} className="object-contain" priority />
                  </div>

                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-red-700 mb-2">SENJA DI MENTARI</h3>
                    <p className="text-green-800 font-bold">Coffee Shop</p>
                    <Chip className="mt-2 bg-red-600 text-white font-bold" variant="flat">
                      NMID: ID1025421255700
                    </Chip>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <Button
                      color="warning"
                      variant="flat"
                      startContent={<ArrowDownTrayIcon className="w-4 h-4" />}
                      onPress={downloadQRCode}
                      className="bg-red-600 text-white hover:bg-red-500 font-bold border-2 border-yellow-400"
                    >
                      DOWNLOAD
                    </Button>
                    <Button color="default" variant="flat" onPress={onClose} className="bg-green-600 text-white hover:bg-green-500 font-bold border-2 border-yellow-400">
                      CLOSE
                    </Button>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
