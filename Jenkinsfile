pipeline {
    agent any

    parameters {
        string(name: 'VERSION', defaultValue: '', description: 'Rollback version (optional)')
    }

    environment {
        DOCKER_USER = "your-docker-username"
        APP_NAME = "my-node-app"
        CONTAINER_NAME = "my-node-container"
        PORT = "3000"
    }

    stages {

        stage('Build Docker Image') {
            when {
                expression { params.VERSION == '' }
            }
            steps {
                echo "Building image ${BUILD_NUMBER}"
                sh "docker build -t ${DOCKER_USER}/${APP_NAME}:${BUILD_NUMBER} ."
            }
        }

        stage('Push to Docker Hub') {
            when {
                expression { params.VERSION == '' }
            }
            steps {
                echo "Pushing image to Docker Hub"
                sh "docker push ${DOCKER_USER}/${APP_NAME}:${BUILD_NUMBER}"
            }
        }

        stage('Stop Old Container') {
            steps {
                sh "docker rm -f ${CONTAINER_NAME} || true"
            }
        }

        stage('Run Container') {
            steps {
                script {
                    def imageVersion = params.VERSION ? params.VERSION : BUILD_NUMBER

                    echo "Deploying version ${imageVersion}"

                    sh "docker run -d -p ${PORT}:${PORT} --name ${CONTAINER_NAME} ${DOCKER_USER}/${APP_NAME}:${imageVersion}"
                }
            }
        }
    }
}
