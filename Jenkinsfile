pipeline {
    agent any

    parameters {
        string(name: 'VERSION', defaultValue: '', description: 'Enter version to rollback (leave empty for latest)')
    }

    environment {
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
                echo "Building Docker image with version ${BUILD_NUMBER}"
                sh "docker build -t ${APP_NAME}:${BUILD_NUMBER} ."
            }
        }

        stage('Stop Old Container') {
            steps {
                echo "Stopping old container if exists..."
                sh "docker rm -f ${CONTAINER_NAME} || true"
            }
        }

        stage('Run Container') {
            steps {
                script {
                    def imageVersion = params.VERSION ? params.VERSION : BUILD_NUMBER

                    echo "Deploying version ${imageVersion}"

                    sh "docker run -d -p ${PORT}:${PORT} --name ${CONTAINER_NAME} ${APP_NAME}:${imageVersion}"
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
