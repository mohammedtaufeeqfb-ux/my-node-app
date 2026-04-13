pipeline {
    agent any

    stages {

        stage('Clone Code') {
            steps {
                echo "Cloning repo..."
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-node-app .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker rm -f my-node-container || true'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 3000:3000 --name my-node-container my-node-app'
            }
        }

    }
}
