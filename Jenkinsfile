pipeline {
    agent any

    parameters {
        string(name: 'VERSION', defaultValue: '', description: 'Rollback version (leave empty for latest)')
    }

    environment {
        DOCKER_USER = "taufeeqdev"
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
                echo "Building image version ${BUILD_NUMBER}"
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
                echo "Stopping old container..."
                sh "docker rm -f ${CONTAINER_NAME} || true"
            }
        }

        stage('Pull & Run Container') {
            steps {
                script {
                    def imageVersion = params.VERSION ? params.VERSION : BUILD_NUMBER

                    echo "Deploying version ${imageVersion}"

                    sh """
                    docker pull ${DOCKER_USER}/${APP_NAME}:${imageVersion}
                    docker run -d -p ${PORT}:${PORT} --name ${CONTAINER_NAME} ${DOCKER_USER}/${APP_NAME}:${imageVersion}
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}
