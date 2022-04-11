run:
	npm run dev

docker-image:
	docker build -t revent-app .  

test:
	npm run test