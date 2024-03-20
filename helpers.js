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

export function rand(low, high) {
  return ~~(Math.random() * (high - low)) + low;
}

export function shuffle(collection) {
  return collection.sort(() => 0.5 - Math.random());
}

export function primes() {
  return shuffle([
    101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173,
    179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257,
    263, 269, 271, 277, 281, 283, 293,
  ]);
}

export function oneOf(collection) {
  return shuffle(collection)[0];
}
