
import cssnano from 'cssnano';

export default {
  plugins: [
    {
      name: 'css-minification',
      async transform({ content }) {
        const result = await cssnano.process(content, { from: undefined });
        return { code: result.css };
      },
    },
  ],
};