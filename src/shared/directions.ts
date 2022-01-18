export const getDirections = (directions: string) => {
  if (!directions) return [''];
  let directionArray = [];

  const _dirObj = {
    top: '-top',
    right: '-right',
    bottom: '-bottom',
    left: '-left',
  };

  for (let i = 0; i < directions.length; i++) {
    const direction = directions[i];
    switch (direction) {
      case 'v':
        directionArray.push(_dirObj.top, _dirObj.bottom);
        break;
      case 'h':
        directionArray.push(_dirObj.left, _dirObj.right);
        break;
      case 'l':
        directionArray.push(_dirObj.left);
        break;
      case 'r':
        directionArray.push(_dirObj.right);
        break;
      case 't':
        directionArray.push(_dirObj.top);
        break;
      case 'b':
        directionArray.push(_dirObj.bottom);
        break;
      default:
        break;
    }
  }

  return directionArray.length > 0 ? directionArray : [''];
};
