export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:       '#151008',
        surface:  '#1c1508',
        surface2: '#231b0d',
        border:   '#2e2412',
        border2:  '#3d3020',
        orange:   '#E8622A',
        orange2:  '#c94e1e',
        cream:    '#EDE0CC',
        muted:    '#7a6a55',
        muted2:   '#3d3020',
      },
      fontFamily: {
        condensed: ['"Barlow Condensed"', 'sans-serif'],
        sans:      ['Barlow', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
