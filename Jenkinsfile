pipeline {
   agent any

   environment {
           DOCKER_REG = "registry.cn-chengdu.aliyuncs.com/lura"
           CORN_UI_REPOSITORY = "${DOCKER_REG}/corn-ui"
           CORN_UI_IMAGE = "${CORN_UI_REPOSITORY}:build-${BUILD_NUMBER}"
       }
   stages {
        stage('Build') {
            steps {
            // Run Maven on a Unix agent.
            sh "cnpm install && cnpm run build"
            }
        }

         stage("dockerize") {
            steps {
                withCredentials([string(credentialsId: 'docker-registry-passwd', variable: 'password')]) {
                        sh 'test=${password} && echo test: ${test}'
                        sh 'echo ${password} |sudo docker login --username=liuran_qian@163.com  registry.cn-chengdu.aliyuncs.com --password-stdin'
                        sh 'sudo docker build -t ${CORN_UI_IMAGE} .'
                        sh 'sudo docker push ${CORN_UI_IMAGE}'
                        sh 'sudo docker rmi ${CORN_UI_IMAGE}'
                }

            }
        }


        stage('Deploy') {
            steps {
                sh '''echo 'Deploy3....' '''
                sh "envsubst < BuildScript/deployment-sit.yml | sudo kubectl apply -f -"

           }
        }
   }
}
