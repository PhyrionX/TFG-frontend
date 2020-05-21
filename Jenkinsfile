pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                checkout scm
                sh 'pwd'    
                sh 'ls'
                sh 'echo $GIT_BRANCH'
                sh 'node --version'
                echo 'Building..'

                sh 'docker build -t  phyrion/tfg:latest .'
                sh 'docker-compose up --force-recreate -d'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
