import * as fs from 'fs';

export default ({ $config, sitemaps }) => {
	let robotsInfo = `User-agent: *
${$config.allowRobots ? 'Allow' : 'Disallow'}: /`;
	sitemaps.forEach((v) => {
		robotsInfo += `\nSitemap: ${$config.baseUrl}${v.path}`;
	});
	fs.writeFileSync('static/robots.txt', robotsInfo, 'utf-8');
};
