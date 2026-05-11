export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paw: {
          pink: '#FF6B9D',
          purple: '#9B59B6',
          orange: '#FF8C42',
          cream: '#FFF5E6',
          dark: '#2C1810',
        }
      },
      fontFamily: {
        display: ['Nunito', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      }
    }
  },
  plugins: []
}
