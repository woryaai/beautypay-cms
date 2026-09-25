const base = (process.env.CMS_API_URL || "http://localhost:8000/api/cms").replace(/\/$/, "");
const language = process.env.CMS_LANGUAGE || "fa";
for (const path of ["/healthcheck/", `/${language}/pages/`, `/${language}/menu/`, "/site-settings/"]) {
  const response = await fetch(`${base}${path}`);
  console.log(`${response.status} ${path}`);
  if (!response.ok && response.status !== 404) process.exitCode = 1;
}
