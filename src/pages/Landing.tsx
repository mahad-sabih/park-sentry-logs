
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ParkingCircle, Shield, Cog, Clock, ClipboardList, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <ParkingCircle className="h-6 w-6 text-primary mr-2" />
            <span className="font-medium text-xl">Park Sentry</span>
          </div>
          <div className="space-x-2">
            <Link to="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link to="/login">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Complete Car Park Management Solution</h1>
              <p className="text-xl text-gray-600 mb-8">
                Manage equipment, track faults, and monitor status across your car park facilities, all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Book a Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden border">
                <img 
                  src="/placeholder.svg" 
                  alt="Park Sentry Dashboard" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <ClipboardList className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Fault Reporting</h3>
              <p className="text-gray-600">Track and manage equipment issues with detailed reports and status updates.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Cog className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Equipment Management</h3>
              <p className="text-gray-600">Comprehensive inventory and maintenance tracking for all your equipment.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Real-time Status</h3>
              <p className="text-gray-600">Monitor the current state of all your car park systems in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to improve your car park operations?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join hundreds of car park operators who trust Park Sentry for their management needs.
          </p>
          <Link to="/login">
            <Button variant="secondary" size="lg">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <ParkingCircle className="h-6 w-6 text-primary mr-2" />
                <span className="font-medium text-xl">Park Sentry</span>
              </div>
              <p className="text-gray-600 max-w-xs">
                The complete solution for car park management and equipment monitoring.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-medium mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-primary">Features</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary">Pricing</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary">Testimonials</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-primary">Documentation</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary">Support</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-primary">About</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary">Contact</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary">Careers</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-gray-600">&copy; {new Date().getFullYear()} Park Sentry. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
