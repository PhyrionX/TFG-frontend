pipeline {
	agent any

	stages {
		stage('SCM') {
			steps {
				checkout scm
				sh 'echo $GIT_BRANCH'
				sh 'echo $GIT_COMMIT'
			}
		}
		stage('Build') {
			steps {
				echo 'build'
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
				sh 'docker build -t  phyrion/tfg:latest .'
				sh 'docker-compose up --force-recreate -d'
			}
		}
	}
}
