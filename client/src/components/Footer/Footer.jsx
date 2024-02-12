export default function Footer() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 bg-gray-200 text-center">
      <div className="md:flex md:justify-between gap-8 text-left border-b border-gray-500">
        <div className="md:w-1/3 mb-6 md:mb-0">
          <b className="text-2xl mb-2 block">Support</b>
          <p className="py-2 cursor-pointer mt-3">Help Center</p>
          <p className="py-2 cursor-pointer">Air Cover</p>
          <p className="py-2 cursor-pointer">Supporting people</p>
          <p className="py-2 cursor-pointer">Cancellation Options</p>
          <p className="py-2 cursor-pointer">Report a concern</p>
        </div>
        <div className="md:w-1/3 mb-6 md:mb-0">
          <b className="text-2xl mb-2 block">Community</b>
          <p className="py-2 cursor-pointer mt-3">Disaster relief fund</p>
          <p className="py-2 cursor-pointer">Combating Discrimination</p>
          <p className="py-2 cursor-pointer">Careers</p>
          <p className="py-2 cursor-pointer">NewsRoom</p>
          <p className="py-2 cursor-pointer">Investors</p>
        </div>
        <div className="md:w-1/3">
          <b className="text-2xl mb-2 block">Hosting</b>
          <p className="py-2 cursor-pointer mt-3">Explore hosting resources</p>
          <p className="py-2 cursor-pointer">Air Cover for Hosts</p>
          <p className="py-2 cursor-pointer">How to Host responsibly</p>
        </div>
      </div>
    </div>
  );
}
