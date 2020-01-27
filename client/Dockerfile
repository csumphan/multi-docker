#Build phase 
# will refer this container as builder
# don't need volume system anymore
FROM node:alpine as builder

WORKDIR '/app'

COPY package.json .
RUN npm install

COPY . .

RUN npm run build


# in the container: /app/build <-- all the production stuff


#Run phase use nginx, copy build files, start nginx
# any block can only have one FROM, so the build phase stops befor run phase
FROM nginx
#for beanstalk, when it start ur docker container it looks for expose instruction
EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# copys something from diff phase
COPY --from=builder /app/build /usr/share/nginx/html

# default command to start nginx, so no need to add command