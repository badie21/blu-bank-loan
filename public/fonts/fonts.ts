import localFont from 'next/font/local';

const IranSans = localFont({
  src: [
    {
      path: './IRANSansWeb(FaNum)_Bold.woff2',
      weight: '700'
    }
  ],
  variable: '--font-my-font'
});

export default IranSans;
