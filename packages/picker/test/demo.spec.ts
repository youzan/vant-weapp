import path from 'path';
import simulate from 'miniprogram-simulate';

test('should render demo and match snapshot', () => {
  const id = simulate.load(path.resolve(__dirname, '../demo/index'), {
    rootPath: path.resolve(__dirname, '../../'),
  });
  const comp = simulate.render(id);
  comp.attach(document.createElement('parent-wrapper'));
  expect(comp.toJSON()).toMatchSnapshot();
});
