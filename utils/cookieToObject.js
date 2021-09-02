const cookieToObject = function (rawCookie) {
  if (!rawCookie) return {};

  const result = {};
  rawCookie.split("; ").forEach((item) => {
    const cookie = item.split("=");
    result[cookie[0]] = decodeURIComponent(cookie[1]);
  });

  return result;
};

export default cookieToObject;
