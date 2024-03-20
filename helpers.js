export function isolate(context, callback) {
  context.save();
  context.beginPath();
  callback(context);
  context.closePath();
  context.restore();
}

export function pi(coefficient = 1) {
  return Math.PI * coefficient;
}

export function triangle(context, x, y, size) {
  const path = new Path2D();
  path.moveTo(x, y);
  path.lineTo(x + size / 2, y + size / 2);
  path.lineTo(x - size / 2, y + size / 2);
  context.fill(path);
}
